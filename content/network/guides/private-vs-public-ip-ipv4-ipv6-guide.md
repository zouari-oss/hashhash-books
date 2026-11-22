# Guide: Private and Public IP Addresses in IPv4 and IPv6

## 1. What is an IP Address?

An **IP address** is a unique identifier for a device on a network. It allows devices to communicate with each other.

There are two main versions:

- **IPv4**: Uses 32 bits, written as 4 decimal numbers (e.g., `192.168.1.1`).
- **IPv6**: Uses 128 bits, written as 8 groups of hexadecimal numbers separated by colons (e.g., `2001:0db8::1`).

## 2. Private vs Public IP Addresses

- **Public IP address:**  
  Used to communicate on the **Internet**. These addresses are globally unique and routable.

- **Private IP address:**  
  Used **only inside private networks** (home, office). Not routable on the Internet. Devices with private IPs communicate outside through a router using **NAT** (**N**etwork **A**ddress **T**ranslation).

## 3. Private and Public IPv4 Addresses

### Private IPv4 Ranges (RFC 1918)

| Range                         | CIDR Notation  | Description                   |
| ----------------------------- | -------------- | ----------------------------- |
| 10.0.0.0 – 10.255.255.255     | 10.0.0.0/8     | Large private networks        |
| 172.16.0.0 – 172.31.255.255   | 172.16.0.0/12  | Medium-sized private networks |
| 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 | Small/home networks           |

### Public IPv4 Addresses

- All IPv4 addresses **outside** the private ranges above.
- Used on the Internet.
- Example: `8.8.8.8` (Google DNS)

## 4. Private and Public IPv6 Addresses

### Private IPv6 Addresses (Unique Local Addresses - ULA)

| Range                                                | CIDR Notation | Description                  |
| ---------------------------------------------------- | ------------- | ---------------------------- |
| `fc00::` – `fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff` | `fc00::/7`    | Private local networks (ULA) |

### Link-Local Addresses (IPv6 only)

| Range                                                | CIDR Notation | Description                                          |
| ---------------------------------------------------- | ------------- | ---------------------------------------------------- |
| `fe80::` – `febf:ffff:ffff:ffff:ffff:ffff:ffff:ffff` | `fe80::/10`   | Local link addresses, not routable beyond local link |

### Public IPv6 Addresses (Global Unicast)

| Range                                                | CIDR Notation | Description                     |
| ---------------------------------------------------- | ------------- | ------------------------------- |
| `2000::` – `3fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff` | `2000::/3`    | Global routable on the Internet |

## 5. Summary Table

| IP Version | Type    | Range Example                 | Usage                                |
| ---------- | ------- | ----------------------------- | ------------------------------------ |
| IPv4       | Private | `192.168.1.0 – 192.168.1.255` | Home networks, not Internet routable |
| IPv4       | Public  | `8.8.8.8`                     | Internet routable                    |
| IPv6       | Private | `fd00::/8`                    | Local private IPv6 networks          |
| IPv6       | Public  | `2001:0db8::/32`              | Internet routable                    |

## 6. Visual Diagram

```plaintext
           ┌──────────────────────────────┐
           │         INTERNET             │
           │ (Public IPv4 & IPv6 networks)│
           └─────────────┬────────────────┘
                         │ Public IP (e.g. 8.8.8.8 / 2001::1)
                         │
                   Router with NAT
                         │
        ┌────────────────┴─────────────────┐
        │                                  │
  Private IPv4                      Private IPv6
  (e.g. 192.168.1.0/24)            (e.g. fd00::/8)
        │                                  │
   ┌────┴────────┐                   ┌─────┴─────┐
   │ Device 1    │                   │ Device A  │
   │ 192.168.1.2 │                   │ fd00::1   │
   └─────────────┘                   └───────────┘
   ┌────┴────────┐                   ┌─────┴─────┐
   │ Device 2    │                   │ Device B  │
   │ 192.168.1.3 │                   │ fd00::2   │
   └─────────────┘                   └───────────┘

- Devices with **private IPs** communicate locally.
- Router translates private IPs to the public IP for internet access.
- Public IPs are globally unique and reachable.
```

## 7. Key Points

- **Private IPs** work only within local networks.
- Devices behind a router use **NAT** to access the internet.
- **Public IPs** are unique worldwide.
- IPv6 provides a much larger address space than IPv4.

## 8. How to check your IP?

- Visit [ifconfig.me](https://ifconfig.me) to find your **public IP**.
- Use your computer’s network settings or router to find your **private IP**.
