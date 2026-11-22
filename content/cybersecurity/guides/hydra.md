# Hydra

- **Hydra** is a <mark>brute force online password cracking program</mark>, a quick system login password “hacking” tool.
- **Hydra** can run through a **list** and “brute force” some authentication services.
- Imagine trying to manually guess someone’s password on a particular service (SSH, Web Application Form, FTP or SNMP), we can use Hydra to run through a password list and _speed this process_ up for us, _determining the correct password_.
- **Hydra** has the ability to brute force the following protocols: `Asterisk, AFP, Cisco AAA, Cisco auth, Cisco enable, CVS, Firebird, FTP, HTTP-FORM-GET, HTTP-FORM-POST, HTTP-GET, HTTP-HEAD, HTTP-POST, HTTP-PROXY, HTTPS-FORM-GET, HTTPS-FORM-POST, HTTPS-GET, HTTPS-HEAD, HTTPS-POST, HTTP-Proxy, ICQ, IMAP, IRC, LDAP, MEMCACHED, MONGODB, MS-SQL, MYSQL, NCP, NNTP, Oracle Listener, Oracle SID, Oracle, PC-Anywhere, PCNFS, POP3, POSTGRES, Radmin, RDP, Rexec, Rlogin, Rsh, RTSP, SAP/R3, SIP, SMB, SMTP, SMTP Enum, SNMP v1+v2+v3, SOCKS5, SSH (v1 and v2), SSHKEY, Subversion, TeamSpeak (TS2), Telnet, VMware-Auth, VNC and XMPP`
- We can use Hydra to brute force **web forms** too. You must know which type of request it is making; `GET` or `POST` methods are commonly used.

> CCTV cameras and web frameworks often use `admin:password` as the default login credentials, which is obviously not strong enough.

## Hydra Commands

The options we pass into Hydra depend on which service (protocol) we’re attacking.

| Option                    | Description                                                          |
| ------------------------- | -------------------------------------------------------------------- |
| `-l LOGIN`                | Use a single login name                                              |
| `-L FILE`                 | Load multiple login names from FILE                                  |
| `-p PASS`                 | Try a single password                                                |
| `-P FILE`                 | Load multiple passwords from FILE                                    |
| `-C FILE`                 | Use colon-separated `login:pass` entries from FILE                   |
| `-M FILE`                 | List of targets (one per line); use `host:port` format if needed     |
| `-t TASKS`                | Number of parallel connections per target (default: 16)              |
| `-s PORT`                 | Specify port to connect to                                           |
| `-x MIN:MAX:CHARSET`      | Generate passwords; specify length and charset (e.g., `-x 1:6:a1`)   |
| `-e nsr`                  | Additional tries: `n` (null), `s` (login==pass), `r` (reverse login) |
| `-o FILE`                 | Output file for successful attempts                                  |
| `-f`                      | Exit after first valid login is found                                |
| `-w TIME`                 | Timeout for connects (seconds)                                       |
| `-W TIME`                 | Wait TIME seconds between connects                                   |
| `-c TIME`                 | Wait TIME seconds between login attempts                             |
| `-m OPT`                  | Module-specific options (see `-U`)                                   |
| `-U`                      | Show usage/help for a specific service module                        |
| `-I`                      | Ignore fake 1xx responses from HTTP                                  |
| `-S`                      | Use SSL for services that support it                                 |
| `-O`                      | Print output to stdout                                               |
| `-u`                      | Loop users first, then passwords                                     |
| `-v`                      | Verbose mode                                                         |
| `-V`                      | Very verbose (show login+password per attempt)                       |
| `-d`                      | Debug mode                                                           |
| `-4`                      | Force use of IPv4                                                    |
| `-6`                      | Force use of IPv6                                                    |
| `-h`                      | Display complete help message                                        |
| `service://server[:PORT]` | Target specification: protocol, host, optional port                  |
| `OPT`                     | Extra parameters passed to service module (see `-U` for details)     |

> 💡 Use `hydra -U` to get help on specific modules like `ssh`, `ftp`, `http-form`, etc.

## Examples

- `hydra -l root -P passwords.txt MACHINE_IP -t 4 ssh` will run with the following arguments:
  - Hydra will use `root` as the username for ssh
  - It will try the passwords in the `passwords.txt` file
  - There will be four threads running in parallel as indicated by `-t 4`
- `hydra -l <username> -P <wordlist> MACHINE_IP http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`
  - The login page is only `/`, i.e., the main IP address.
  - The `username` is **the form field** where the username is entered
  - The specified username(s) will replace `^USER^`
  - The `password` is **the form field** where the password is entered
  - The provided passwords will be replacing `^PASS^`
  - Finally, `F=incorrect` is a string that appears in the server reply when **the login fails**

## 🔗 Links

- [THC-Hydra repository](https://github.com/vanhauser-thc/thc-hydra)
- [Hydra doc](https://en.kali.tools/?p=220)
