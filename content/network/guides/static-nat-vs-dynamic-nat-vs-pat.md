# Understanding NAT: Static NAT, Dynamic NAT, and PAT

Network Address Translation (NAT) is a technique used to translate private IP addresses inside a local network to public IP addresses used on the internet. There are several types of NAT, each serving different purposes.

## 1. Static NAT

- **Definition:**  
  Static NAT creates a **one-to-one fixed mapping** between a private IP address and a public IP address.
- **Use case:**  
  When an internal device (like a server) needs to be **permanently accessible** from outside the network (internet).
- **How it works:**  
  The router translates the private IP to the assigned public IP every time, both inbound and outbound traffic.
- **Example:**  
  Internal server `192.168.10.10` is always mapped to public IP `209.165.200.226`.

| Private IP    | Public IP       |
| ------------- | --------------- |
| 192.168.10.10 | 209.165.200.226 |

### Cisco Configuration Example

```bash
! Define inside and outside interfaces
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 ip nat inside
!
interface GigabitEthernet0/1
 ip address 209.165.200.1 255.255.255.0
 ip nat outside
!
! Static NAT mapping
ip nat inside source static 192.168.10.10 209.165.200.226
```

## 2. Dynamic NAT

- **Definition:**
  Dynamic NAT uses a **pool of public IP addresses** and maps private IP addresses to available public IPs dynamically.
- **Use case:**
  When multiple internal devices need temporary access to the internet, but do **not require a permanent public IP**.
- **How it works:**
  When a device initiates a connection, the router assigns a free public IP from the pool. Once the session ends, the public IP is returned to the pool.
- **Limitation:**
  The number of simultaneous connections is limited by the number of public IPs in the pool.

### Cisco Configuration Example

```bash
! Define inside and outside interfaces
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 ip nat inside
!
interface GigabitEthernet0/1
 ip address 209.165.200.1 255.255.255.0
 ip nat outside
!
! Define a pool of public IP addresses
ip nat pool MY_POOL 209.165.200.226 209.165.200.230 netmask 255.255.255.0
!
! Access list to identify which internal IPs can be translated
access-list 1 permit/deny 192.168.10.0 0.0.0.255
!
! Apply dynamic NAT using the pool for the allowed internal IPs
ip nat inside source list 1 pool MY_POOL
```

## 3. PAT (Port Address Translation) – NAT Overload

- **Definition:**
  PAT allows **multiple private IP addresses** to share a **single public IP address** by differentiating connections using port numbers (Dynamic NAT + Overloading).
- **Use case:**
  Common in home and office networks where many devices access the internet through one public IP.
- **How it works:**
  The router translates private IP addresses and source ports to the single public IP with unique port numbers, allowing many devices to connect simultaneously.
- **Advantage:**
  Efficient use of a limited number of public IP addresses.

### Cisco Configuration Example

```bash
! Define inside and outside interfaces
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 ip nat inside
!
interface GigabitEthernet0/1
 ip address 209.165.200.1 255.255.255.0
 ip nat outside
!
! Access list to identify which internal IPs are allowed to use PAT
access-list 1 permit 192.168.10.0 0.0.0.255
!
! Enable PAT using the outside interface's IP address
ip nat inside source list 1 interface GigabitEthernet0/1 overload
```

## Summary Table

| NAT Type           | Mapping Type       | Number of Public IPs Required | Accessibility from Internet   | Use Case Example                     |
| ------------------ | ------------------ | ----------------------------- | ----------------------------- | ------------------------------------ |
| Static NAT         | One-to-one fixed   | One per internal device       | Yes (permanent)               | Hosting a web server                 |
| Dynamic NAT        | One-to-one dynamic | Pool of public IPs            | No (temporary, outbound only) | Internal users browsing the internet |
| PAT (NAT Overload) | Many-to-one        | Single public IP              | No (shared, outbound only)    | Home or office internet access       |

## Visual Summary

```
Private IPs: 192.168.1.10, 192.168.1.11, 192.168.1.12

Static NAT:
192.168.1.10 <-> 203.0.113.10
192.168.1.11 <-> 203.0.113.11
192.168.1.12 <-> 203.0.113.12

Dynamic NAT:
192.168.1.10 -> 203.0.113.20 (temporarily assigned)
192.168.1.11 -> 203.0.113.21 (temporarily assigned)

PAT:
192.168.1.10:1234 -> 203.0.113.30:40001
192.168.1.11:5678 -> 203.0.113.30:40002
192.168.1.12:8765 -> 203.0.113.30:40003
```
