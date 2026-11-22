# Termes

- [Termes](#termes)
  - [General Data Protection Regulation (GDPR)](#general-data-protection-regulation-gdpr)
  - [Personal Data](#personal-data)
  - [Infrastructure as Code (IaC)](#infrastructure-as-code-iac)
  - [Availability Zones (AZs)](#availability-zones-azs)
  - [Regions vs AZ's vs Edge Locations](#regions-vs-azs-vs-edge-locations)
  - [High Performance Computing (HPC)](#high-performance-computing-hpc)
  - [Identity and Access Management (IAM)](#identity-and-access-management-iam)
  - [A Virtual Private Cloud (VPC)](#a-virtual-private-cloud-vpc)
  - [Access Control List (ACL)](#access-control-list-acl)
  - [A Network Security Group (NSG)](#a-network-security-group-nsg)
  - [Principle of Least Privilege (PoLP)](#principle-of-least-privilege-polp)

## General Data Protection Regulation (GDPR)

Regulates how personal data is collected, processed, and stored from users in the EU

Other regulation: `LGPD`, `CCPA`, `HIPAA`, `APPI`, `PDPA`, `PIPEDA`, etc..

## Personal Data

Personal data is any information that relates to an identified or identifiable living individual.
Different pieces of information, which collected together can lead to the identification of a
particular person, also constitute personal data.

## Infrastructure as Code (IaC)

Infrastructure as code (IaC) is the ability to provision and support your computing infrastructure using code instead of manual processes and settings.

## Availability Zones (AZs)

It is a single, isolated data center (or group of data centers) used by cloud providers like AWS. Each AZ has its own power, cooling, and internet. This keeps your apps running safely even if one zone fails

## Regions vs AZ's vs Edge Locations

| Feature        | Region                  | Availability Zone (AZ)             | Edge Location               |
| -------------- | ----------------------- | ---------------------------------- | --------------------------- |
| Main Purpose   | Host your apps globally | Prevent downtime & backup          | Speed up content delivery   |
| Physical Scale | Large geographic area   | Distinct buildings inside a Region | Small localized data center |
| Quantity       | 30+ globally            | 3+ per Region                      | Hundreds globally           |

## High Performance Computing (HPC)

High performance computing (HPC) is the practice of aggregating computing
resources to gain performance greater than that of a single workstation, server,
or computer

> HPC optimized instances: best price performance for running high performance
> workloads at scale

## Identity and Access Management (IAM)

- A cybersecurity framework of policies, processes, and technologies that ensures
  the right people and entities access the right resources at the right time.
- It centralizes digital identity management, access authorization,
  and lifecycle tracking to secure sensitive corporate data.

## A Virtual Private Cloud (VPC)

- A logically isolated, private network environment hosted within a shared public cloud infrastructure.
- It gives you complete control over your virtual networking resources, including IP address
  ranges, subnets, route tables, and network gateways, combining the scalability of public clouds with the security of a private data center.

## Access Control List (ACL)

- A digital security rulebook
- It tells a computer system exactly who can access a resource and what they are
  allowed to do with it

## A Network Security Group (NSG)

- A virtual firewall for cloud resources.
- It filters incoming and outgoing traffic using rules.
- NSGs use parameters like **IP addresses**, **ports**, and **protocols** to
  _allow_ or _deny_ data packets.
- They act as the first line of defense for your servers.

## Principle of Least Privilege (PoLP)

An information security concept stating that users, systems, and applications
should only be granted the minimum level of access—or permissions—necessary
to perform their authorized functions, and nothing more

> [!NOTE]
> Use groups to assign permissions, not individuals
