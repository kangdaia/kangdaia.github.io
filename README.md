
# What Make You <span style="color:#FF0078">Happy</span>?

===========================================

***Final Tutorial Project for CMSC320, Fall2020***
*Created by Dahye Kang*

## Table of Contents

- [What Make You <span style="color:#FF0078">Happy</span>?](#what-make-you-happy)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [0. Getting Started](#0-getting-started)
  - [1. Data Processing](#1-data-processing)
    - [1.1 Reading Data from File](#11-reading-data-from-file)
    - [1.2 Fill the Empty Column](#12-fill-the-empty-column)
    - [1.3 Extract and Rename](#13-extract-and-rename)
  - [2. Data Exploration and Analysis](#2-data-exploration-and-analysis)
  - [3. Regression (Hypothesis Testing)](#3-regression-hypothesis-testing)
  - [4. Conclusion](#4-conclusion)

***

## Introduction

Happiness is one of the most important parts of human life. We feel happiness from pleasure or joy instantaneously and feel happiness from life satisfaction. Long-term life satisfaction is one of the most important factors in human life and influence how society is satisfied, not only the individual. Since 2012, based on the survey, people digitize the answer to measure happiness from life satisfaction.

Every year, the World Happiness Report releases global happiness data for each country. The reports review the state of happiness in the world today and show how the digitized data of happiness explains personal and national variations in happiness. Due to the efficiency and reliability of happiness measurements, the report is used in organizations and civil society to inform their policy-making decisions.

The scores are based on answers to the main life evaluation question asked in the poll from Gallup World Poll. The questions ask for answers in a range of 0 to 10 that zero is the worst possible life, and ten is the best possible life. In the data, the columns following the happiness score estimate the extent to which each of six factors – economy (GDP per Capita), social support (family), healthy life expectancy, freedom, absence of corruption, and generosity; these explain why some countries rank higher than others.

In this instruction, we will focus on how each factor influences a high or low score, which leads to a high or low rank of happiness, and see the priority factor of happiness; Money, healthy, or freedom?

***

## 0. Getting Started

All the work is based on Python 3 (Python 3.9.0) with the following packages:

- **pandas**:
  - a module that use to make a date frame, organize, and do other various work for data table; necessary for data handling.
- **numpy**:
  - a module to use for multi-dimension array. Required when dealing with linear algebra calculation.
- **matplotlib**:
  - a module to visualize the data; can make various graphs. We only use the pyplot from matplotlib package.
- **seaborn**:
  - data visualization library based on matplotlib, but more various and high-level plot can use to visualize the data
- **sklearn**:
  - a module for machine learning to use to learn and predict the model in various way; linear regression, classfication, etc.

If you are new to this, install the modules using <code>pip install [module_name]</code> (this is one way to install a module; there is various way to install).
Import the modules like this in the code:
<pre>
<code>import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
import seaborn as sns
import sklearn </code>
</pre>

After calling all the necessary modules, we need to download the dataset. Each year, the World Happiness Report release the dataset, but as we cannot download all the file individually, we use *kaggle.com* to download already collected data for 2015 to 2019 by other users.
Download dataset in this link: [World_Happiness][kagglelink]

[kagglelink]: https://www.kaggle.com/unsdsn/world-happiness

***

## 1. Data Processing

### 1.1 Reading Data from File

In this section, the goal is reading data from CSV files, reorganizing the data as we want.
First, as each year data is in separate csv file, we need to read each csv file. Read the CSV files for each year by **pd.read_csv(filename)** method, and DO NOT add all data up yet; each file has differet columns and columns' name. Also, the original CSV files do not have a column indicating year, I add the year column to the DataFrame using **insert(location, column_name, column_value, allow_duplicate = True)**.
<pre>
<code>data_2015 = pd.read_csv(f"WorldHappiness/2015.csv", sep=",")
data_2015.insert(0, "year", 2015, True)

data_2016 = pd.read_csv(f"WorldHappiness/2016.csv", sep=",")
data_2016.insert(0, "year", 2016, True)

data_2017 = pd.read_csv(f"WorldHappiness/2017.csv", sep=",")
data_2017.insert(0, "year", 2017, True)

data_2018 = pd.read_csv(f"WorldHappiness/2018.csv", sep=",")
data_2018.insert(0, "year", 2018, True)

data_2019 = pd.read_csv(f"WorldHappiness/2019.csv", sep=",")
data_2019.insert(0, "year", 2019, True)</code>
</pre>

Before making data efficient, we need to check that each dataset's columns are different or equivalent.
Here is the shape of each year dataset:

- 2015 Data Shape:  (158, 13)
- 2016 Data Shape:  (157, 14)
- 2017 Data Shape:  (155, 13)
- 2018 Data Shape:  (156, 10)
- 2019 Data Shape:  (156, 10)

Each year data has some different columns, so to make all year data to one, we only use the columns that exist in all data set. Below is the table showing which year's data is missing or named differently:

| 2015 | 2016 | 2017 | 2018 | 2019|
|------|------|------|------|-----|
|Country|Country|Country|Country or region|Country or region|
|Region|Region||||
|Happiness Rank|Happiness Rank|Happiness.Rank|Happiness Rank|Happiness Rank|
|Happiness Score|Happiness Score|Happiness.Score|Happiness Score|Happiness Score|
|Standard Error|Lower Confidence Interval|Whisker.high|||
||Upper Confidence Interval|Whisker.low|||
|Economy (GDP per Capita)|Economy (GDP per Capita)|Economy..GDP.per.Capita.|GDP per capita|GDP per capita|
|Family|Family|Family|Social support|Social support|
|Health (Life Expectancy)|Health (Life Expectancy)|Health..Life.Expectancy.|Healthy life expectancy|Healthy life expectancy|
|Freedom|Freedom|Freedom|Freedom to make life chices|Freedom to make life chices|
|Trust (Government Corruption)|Trust (Government Corruption)|Trust..Government.Corruption.|Perceptions of corruption|Perceptions of corruption|
|Generosity|Generosity|Generosity|Generosity|Generosity|
|Dystopia Residual|Dystopia Residual|Dystopia.Residual|||

In summary, we will use the columns: country, region, rank, score, gdp, family, lifeExp, freedom, trust, and generosity. There is no region data in 2017, 2018, and 2019, but the region data is useful to analyze the data by grouping it, we will merge the 2015 and 2016 region data to 2017, 2018, and 2019.

### 1.2 Fill the Empty Column

To get the region data from 2015 and 2016, sort the two datasets by *Country* name, and extract only the *Country* and *Region* columns. Then, the 2015 data and 2016 data have different length, so we need to consider the case that the countries only exist in one of the dataset. To prevent loss, we will merge the two region data as **outer** option in **pd.merge** function.
<pre>
<code>#Sort data by Country
sort_2016 = data_2016.sort_values(by="Country")
sort_2015 = data_2015.sort_values(by="Country")

#Get the Country and Region columns only
region_2016 = sort_2016[["Country", "Region"]]
region_2015 = sort_2015[["Country", "Region"]]

#Merge two
region = pd.merge(region_2015,region_2016, how="outer")</code>
</pre>

- region and country shape:  (164, 2)

Now, the region has more region data than data from 2015 and 2016.
After making the region dataset, we will apply this region data to different year datasets. The 2018 and 2019 dataset have different column name for *Country* as *Country or region* (check the above column list table), specifing the merge option that the column in left dataset to merge is "Country or region" and the column in right dataset to merge is "Country". The merge between the 2017, 2018, and 2019 data and region data is inner merge (default); it will not include the row which cannot find corresponding country and region in region data.
<pre>
<code>data_new_2017 = pd.merge(data_2017, region)
data_new_2018 = pd.merge(data_2018, region, left_on="Country or region", right_on="Country")
data_new_2019 = pd.merge(data_2019, region, left_on="Country or region", right_on="Country")</code>
</pre>
The outcome dataset shows the shape as:

- 2015 New Data Shape:  (158, 13)
- 2016 New Data Shape:  (157, 14)
- 2017 New Data Shape:  (153, 14)
- 2018 New Data Shape:  (154, 12)
- 2019 New Data Shape:  (152, 12)

### 1.3 Extract and Rename

As above I said, we only need the data that are all common in every year data.
<pre>
<code>
#columns list to want to use
cols = ["year","country","region","rank","score","gdp","family","lifeExp","freedom","trust","generosity"]

#loop each year dataset and append the necessary data to list
data = []
for i, row in data_2015.iterrows(): # for each row
    app = row[["year","Country","Region","Happiness Rank","Happiness Score","Economy (GDP per Capita)", "Family","Health (Life Expectancy)","Freedom","Trust (Government Corruption)","Generosity"]]
    data.append(app.array)

for i, row in data_2016.iterrows():
    data.append(row[["year","Country","Region","Happiness Rank","Happiness Score","Economy (GDP per Capita)", "Family","Health (Life Expectancy)","Freedom","Trust (Government Corruption)","Generosity"]].array)

for i, row in data_new_2017.iterrows():
    data.append(row[["year","Country","Region","Happiness.Rank","Happiness.Score","Economy..GDP.per.Capita.","Family", "Health..Life.Expectancy.","Freedom","Trust..Government.Corruption.","Generosity"]].array)

for i, row in data_new_2018.iterrows():
    data.append(row[["year","Country or region","Region","Overall rank","Score","GDP per capita", "Social support", "Healthy life expectancy", "Freedom to make life choices", "Perceptions of corruption", "Generosity"]].array)

for i, row in data_new_2019.iterrows():
    data.append(row[["year","Country or region","Region","Overall rank","Score","GDP per capita", "Social support", "Healthy life expectancy", "Freedom to make life choices", "Perceptions of corruption", "Generosity"]].array)
#new dataset
data= pd.DataFrame(data,columns=cols)
data.head()</code>
</pre>
||year|country|region|rank|score|gdp|family|lifeExp|freedom|trust|generosity|
|----|----|----|----|----|----|----|----|----|----|----|----|
|0|2015|Switzerland|Western Europe|1|7.587|1.39651|1.34951|0.94143|0.66557|0.41978|0.29678|
|1|2015|Iceland|Western Europe|2|7.561|1.30232|1.40223|0.94784|0.62877|0.14145|0.43630|
|2|2015|Denmark|Western Europe|3|7.527|1.32548|1.36058|0.87464|0.64938|0.48357|0.34139|
|3|2015|Norway|Western Europe|4|7.522|1.45900|1.33095|0.88521|0.66973|0.36503|0.34699|
|4|2015|Canada|North America|5|7.427|1.32629|1.32261|0.90563|0.63297|0.32957|0.45811|

Now, let's see how the data is related.

## 2. Data Exploration and Analysis

content
***

## 3. Regression (Hypothesis Testing)

content
***

## 4. Conclusion

content
***
