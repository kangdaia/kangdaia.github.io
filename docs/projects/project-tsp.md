# Analysis of Solving Traveling Salesman Problem (TSP)
[:octicons-link-external-16: Document](https://drive.google.com/file/d/1bHP1zX331G9UxgxpVxxj38tMiUVrQA_h/view?usp=sharing)

**CMSC 421: Intro to Artificial Intelligence** 
TSP Solving Analysis Report

> Fall 2020, Dahye Kang

---
##### Overview

Implemented A* with various heuristic solving the Traveling Salesman Problem (TSP); Uniform Cost Search, Random Edges, Cheapest Remaining Edges, Minimum Spanning Trees, Hill Climbing, Simulated Annealing, and Generic Algorithm, and analyzed the test results based on total costs and number of nodes expanded for each algorithm.

---

### Introduction

Using the Python in Jupyter notebook, I implemented 1) A* as Uniform Cost Search, random edges, and
cheapest remaining edges, 2) A* with Minimum-spanning-tree (MST) heuristic, and 3) local search algorithms
which are hill-climbing, simulated annealing, and genetic algorithm methods. After implementation, tested the
accuracy of each algorithm by three different size of 30 TSP graphs (size 5, size 10, and size 15); cannot
proceed with larger size due to system limitation.

### PART. 1

Based on implementation of A* with Uniform Cost Search, Random edges, and Cheapest remaining edges,
analyzed the test results by total cost to take and number of nodes expanded for each algorithm with size 5 and
10.

Figure 1 compares the total cost (minimum, average, maximum) and node expanded by the Uniform cost search
(UCS), Random Edges (Random), and Cheapest remaining edges (CRE) algorithms with 2 different sizes (5 and
10).

// FIG1

In the size=5, the highest average cost is from random remaining heuristic, and the highest number of nodes
expanded is from UCS. In the size=10, also the random heuristic's average cost is the highest, and the UCS's
average number of nodes expanded is the highest. It is not emphasized in size 5, but in size 10, the random
heuristic's difference between min and max is the largest; meaning the output of total cost is varied in a wide
range. Also, for the UCS's number of nodes expanded, it shows a larger difference in Min and Max for each
size.

The figure 2 shows the comparison between the real and CPU runtime for each algorithm for each size. Which
showing the smallest runtime on average is random edges for both size 5 and 10. UCS takes less time than
cheap edges, but there is no big difference in min and max runtime. Depend on the size of the graph, the runtime shows a huge difference. Both UCS and cheapest show 10 times more than the size 5 average runtime
in size 10. The random one shows around 5 times more than the size 5 average runtime in size 10.
The interesting thing is that my cheap heuristic's real runtime has a very high max value compared to other data.
There are some factors to consider: 1) my heuristic is not the optimal algorithm and 2) may have more than
square or longer runtime in some helper functions. The other data shows that CPU runtime and real runtime
have a very small difference on average. However, when comparing the max runtime, there is some difference
between CPU and real runtime. This is stronger in the larger sizes.

// FIG 2

### PART. 2

Analyzed the test result of Minimum-spanning-tree (MST) implementation by the ratio of total cost from MST
to total cost from CRE and ratio of node expanded from MST to CRE with size 5, 10, and 15. Before
proceeding, the data is collected under a fixed starting node to make a better cost comparison on the same
starting point.

// FIGH 3, 4

Both figure 3 and 4 show that as the
larger size, the smaller ratio of total
cost and number of nodes expanded. If
the ratio of the total cost is closed to
zero, then the MST total cost is smaller
compared to the CRE total cost. In the
size 5, there is no big difference
between the total cost of MST and CRE
(some total cost for MST is larger than
CRE), but in the size 15, the ratio is
0.9173 meaning the total cost of MST
is around 90 percent of the total cost of
CRE. This is more standing out in the
graph for the ratio of nodes expanded.
If the ratio of the number of nodes
expanded is closed to zero, then the
MST node expanded is smaller than
CRE. The ratio in size 5 is also small as
that around 50% of nodes expanded in
CRE is the number of nodes expanded
in MST. In the size 15, the ratio is
0.2246 meaning the number of nodes
expanded in MST is around 20% of the
number of nodes expanded in CRE.
Two different results show that the MST
heuristic dominates the CRE heuristic.

Moreover, analyzed the test result of Minimum-spanning-tree (MST) implementation by the difference of total
cost from MST and algorithms from Part 1 to best solution’s costs among algorithms in part 1. Number of nodes
expanded is compared with same method in size 5, 10, and 15.
The figure 5 is the difference in total cost between UCS, Random, and CRE, with MST. It shows that as the size
the larger, the difference becomes larger. The difference is the largest between Random heuristic and MST in
every size group.

The figure 6 shows the difference in node expanded between UCS, Random, and CRE, with MST. In size 5, it is
hard to find the difference between the A heuristics and MST, but in the size 15, the average node expanded is
growing up. However, the Min value shows that both total cost and node expanded if MST is not always a better
result. Sometimes A* makes the smaller total cost of node expanded, but in the frequency that how many times
Figure 3. Ratio of total cost from MST to CRE for size 5, 10, and 15

Figure 4. Ratio of number of nodes expanded from MST to CRE for
size 5, 10, and 15 make a better result, the MST is much better.

// FIGH 5, 6

### PART. 3

//FIGH 7

Implemented the three local search algorithms;
hill-climbing (HC), simulated annealing (SA), and
generic algorithm (GA), and analyzed test result
by comparing difference of total cost with these
and MST and CPU runtime for each algorithm.

//FIGH 8

The points in the HC are very spread out overall,
but many points in SA are one a similar runtime
range. Both HC and SA have a similar difference
in total cost (not much good compared to MST),
but SA shows faster runtime than HC; meaning
the quickest solution under the same condition
solution is the SA.

//FIG 9

Also, the GA is quite fast, but there is a problem
with accuracy. I do the process that returns 0 costs
if the path is not acceptable, and among 30
graphs, 18 graphs show 0 costs. So only 40% is an
acceptable result for GA.
If considering these, the fastest and the most
accurate algorithm based on my code is the SA.

---