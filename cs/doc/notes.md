# Cyber Security Notes

- "To outsmart a hacker, you need to think like one.", This is the core of "Offensive Security.
- Ubuntu Server can run on systems with only 512MB of RAM!

## Careers in Cyber

- **Security analysts** are integral to constructing security measures across organisations to protect the company from attacks. Analysts explore and evaluate company networks to uncover actionable data and recommendations for engineers to develop preventative measures. This job role requires working with various stakeholders to gain an understanding of security requirements and the security landscape.
  - Working with various stakeholders to analyse the cyber security throughout the company
  - Compile ongoing reports about the safety of networks, documenting security issues and measures taken in response
  - Develop security plans, incorporating research on new attack tools and trends, and measures needed across teams to maintain data security.
- **Security engineers** develop and implement security solutions using threats and vulnerability data - often sourced from members of the security workforce. Security engineers work across circumventing a breadth of attacks, including web application attacks, network threats, and evolving trends and tactics. The ultimate goal is to retain and adopt security measures to mitigate the risk of attack and data loss.
  - Testing and screening security measures across software
  - Monitor networks and reports to update systems and mitigate vulnerabilities
  - Identify and implement systems needed for optimal security
- **Incident responders** respond productively and efficiently to security breaches. Responsibilities include creating plans, policies, and protocols for organisations to enact during and following incidents. This is often a highly pressurised position with assessments and responses required in real-time, as attacks are unfolding. Incident response metrics include MTTD, MTTA, and MTTR - the meantime to detect, acknowledge, and recover (from attacks.) The aim is to achieve a swift and effective response, retain financial standing and avoid negative breach implications. Ultimately, incident responders protect the company's data, reputation, and financial standing from cyber attacks.
  - Developing and adopting a thorough, actionable incident response plan
  - Maintaining strong security best practices and supporting incident response measures
  - Post-incident reporting and preparation for future attacks, considering learnings and adaptations to take from incidents
- A **digital forensics examiner** is a professional who investigates cybercrimes and other incidents involving digital evidence. They analyze data from computers, mobile devices, and other digital storage media to uncover how an incident occurred, who was involved, and what data was compromised. This evidence can be used in legal proceedings, both criminal and civil.
  - Collect digital evidence while observing legal procedures
  - Analyse digital evidence to find answers related to the case
  - Document your findings and report on the case
- A **malware analyst's** work involves analysing suspicious programs, discovering what they do and writing reports about their findings. A malware analyst is sometimes called a reverse-engineer as their core task revolves around converting compiled programs from machine language to readable code, usually in a low-level language. This work requires the malware analyst to have a strong programming background, especially in low-level languages such as assembly language and C language. The ultimate goal is to learn about all the activities that a malicious program carries out, find out how to detect it and report it.
  - Carry out static analysis of malicious programs, which entails reverse-engineering
  - Conduct dynamic analysis of malware samples by observing their activities in a controlled environment
  - Document and report all the findings
- A **supply chain attack** is a cyberattack that exploits vulnerabilities in a `third-party provider's systems` to gain access to a target organization's systems or data. Instead of directly attacking the target, the attacker compromises a trusted vendor or partner, using their access to infiltrate the target. These attacks can have a wide-ranging impact, affecting multiple organizations connected through the supply chain. (e.g nvim/plugins in a server)

## Search Skills

- As readers, to evaluate the information. We will mention a few things to consider when evaluating information:
  - _Source_: Identify the author or organization publishing the information. Consider whether they are reputable and authoritative on the subject matter. Publishing a blog post does not make one an authority on the subject.
  - _Evidence and reasoning_: Check whether the claims are backed by credible evidence and logical reasoning. We are seeking hard facts and solid arguments.
  - _Objectivity and bias_: Evaluate whether the information is presented impartially and rationally, reflecting multiple perspectives. We are not interested in authors pushing shady agendas, whether to promote a product or attack a rival.
  - _Corroboration and consistency_: Validate the presented information by corroboration from multiple independent sources. Check whether multiple reliable and reputable sources agree on the central claims.

- A cryptographic method or product considered bogus or fraudulent is often called **snake oil**.

- The search operators supported by ==Google==:
  - **"exact phrase"**: Double quotes indicate that you are looking for pages with the exact word or phrase. For example, one might search for "passive reconnaissance" to get pages with this exact phrase.
  - **site:**: This operator lets you specify the domain name to which you want to limit your search. For example, we can search for success stories on TryHackMe using site:tryhackme.com success stories.
  - **-**: The minus sign allows you to omit search results that contain a particular word or phrase. For example, you might be interested in learning about the pyramids, but you don’t want to view tourism websites; one approach is to search for pyramids -tourism or -tourism pyramids.
  - **filetype::** This search operator is indispensable for finding files instead of web pages. Some of the file types you can search for using Google are Portable Document Format (PDF), Microsoft Word Document (DOC), Microsoft Excel Spreadsheet (XLS), and Microsoft PowerPoint Presentation (PPT). For example, to find cyber security presentations, try searching for filetype:ppt cyber security.

## HTML Injection

- HTML Injection is a vulnerability that occurs when unfiltered user input is displayed on the page. If a website fails to sanitise user input (filter any "malicious" text that a user inputs into a website), and that input is used on the page, an attacker can inject HTML code into a vulnerable website.
