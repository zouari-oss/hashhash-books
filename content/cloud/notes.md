# Cloud Notes

- [Cloud Notes](#cloud-notes)
  - [Cloud Services](#cloud-services)
    - [Cloud databases](#cloud-databases)
    - [Cloud storage](#cloud-storage)
    - [Cloud computing](#cloud-computing)
      - [Cloud Service Models](#cloud-service-models)
      - [Cloud Deployment Models](#cloud-deployment-models)
  - [Load Balancing vs Auto Scaling](#load-balancing-vs-auto-scaling)
    - [Relationship](#relationship)
    - [Summary](#summary)

## Cloud Services

> Think of it like a kitchen: computing is the chef cooking,
> storage is the pantry, and a database is a highly organized recipe box

### Cloud databases

Cloud databases organize data so you can search and update it quickly

### Cloud storage

Cloud storage acts as a digital locker to save files

### Cloud computing

Cloud computing provides processing power to run programs

- Cloud computing isn’t just for **hosting websites**—it powers **data storage**, **backups**, **AI models**, **streaming services**, and much more.

#### Cloud Service Models

There are **3 main types** of cloud computing as-a-service options and each one covers a degree of management for you:

- infrastructure-as-a-service (**IaaS**):
  - Scalable, cloud-based infrastructure
  - Users: System Admins
  - e.g: `EC2`, `google cloude compute engine`, etc..

- platform-as-a-service (**PaaS**)
  - Full development environment
  - Users: Developers
  - e.g: `google app engine`, `AWS Elastic Beanstalk`, etc..

- software-as-a-service (**SaaS**)
  - Software available online, no installation
  - Users: Everyone (end-users)
  - e.g: `google workspace`, `dropbox`, `office365`, etc..

other cloud services models:

- function-as-a-service (**FaaS**)
  - Serverless computing
  - Focus on a function (part of software)
  - e.g: identity authentication, payment transactions

- anything-as-a-service (**XaaS**)
  - cover anything from databases to disaster recovery

- database-as-a-service (**DBaaS**)
  - access and use database software without purchasing and setting up hardware, installing software or managing the system themselves
  - e.g: `AWS RDS`, `Google Cloud SQL`, `Microsoft Azure SQL Database`, etc..

#### Cloud Deployment Models

| Factors                     | Public Cloud   | Private Cloud                                   | Community Cloud                                 | Hybrid Cloud                                    | Multi-Cloud                                                |
| --------------------------- | -------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------- |
| Initial Setup               | Easy           | Complex, requires a professional team to set up | Complex, requires a professional team to set up | Complex, requires a professional team to set up | Complex, requires expertise in managing multiple providers |
| Scalability and Flexibility | High           | High                                            | Fixed                                           | High                                            | Very High                                                  |
| Cost Comparison             | Cost-effective | Costly                                          | Distributed cost among members                  | Between public and private cloud                | Variable; depends on providers and management complexity   |
| Reliability                 | Low            | Low                                             | High                                            | High                                            | Very High (improved redundancy across providers)           |
| Data Security               | Low            | High                                            | High                                            | High                                            | High (depends on configuration and governance)             |
| Data Privacy                | Low            | High                                            | High                                            | High                                            | High (depends on data placement and compliance policies)   |

## Load Balancing vs Auto Scaling

| Feature                     | Load Balancing                                                                                       | Auto Scaling                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Distributes incoming traffic across multiple servers or instances.                                   | Automatically adjusts the number of servers or instances based on demand.                           |
| **Primary Goal**            | Improve availability, reliability, and performance.                                                  | Optimize capacity, performance, and cost.                                                           |
| **How It Works**            | Routes requests to healthy backend instances using algorithms like Round Robin or Least Connections. | Monitors metrics (CPU, memory, request count, etc.) and launches or terminates instances as needed. |
| **Scales Resources?**       | No                                                                                                   | Yes                                                                                                 |
| **Traffic Distribution**    | Yes                                                                                                  | No                                                                                                  |
| **Health Checks**           | Monitors instance health and avoids sending traffic to unhealthy instances.                          | May replace unhealthy instances but does not distribute traffic.                                    |
| **Typical Trigger**         | Every incoming client request.                                                                       | Cloud monitoring metrics, schedules, or policies.                                                   |
| **Benefits**                | High availability, fault tolerance, reduced latency, better resource utilization.                    | Cost savings, elasticity, improved application performance during traffic spikes.                   |
| **Example Services**        | AWS Elastic Load Balancer (ELB), Azure Load Balancer, Google Cloud Load Balancing.                   | AWS Auto Scaling, Azure Virtual Machine Scale Sets, Google Managed Instance Groups.                 |
| **Can Work Independently?** | Yes, but works best with multiple instances.                                                         | Yes, but usually paired with a load balancer.                                                       |
| **Best Use Case**           | Distributing traffic across existing servers.                                                        | Increasing or decreasing server capacity based on workload.                                         |

### Relationship

Load Balancing and Auto Scaling are complementary technologies:

> [!NOTE]
> **Load Balancer** Decides **where** incoming requests should go.
> **Auto Scaling** Decides **how many** servers should be running.

### Summary

| Load Balancing                | Auto Scaling                      |
| ----------------------------- | --------------------------------- |
| Distributes traffic           | Adds/removes servers              |
| Improves availability         | Improves scalability              |
| Handles request routing       | Handles resource capacity         |
| Prevents server overload      | Prevents under/over provisioning  |
| Focuses on traffic management | Focuses on infrastructure scaling |
