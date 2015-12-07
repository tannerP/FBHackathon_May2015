+++
date = "2015-11-01T15:16:52-07:00"
draft = true
title = "Deploying MEAN Stack to EC2 instance with Distelli"
leftnav = "leftnav-tutorials.html"
+++
<br>
## Introduction
This tutorial will walk you through the necessary installations and configurations to run MEAN stack on an AWS EC2 Ubuntu 14.04 server, then  build and deploy your code from your repository (Github, Bitbucket), to the server with Distelli.

Distelli offers continous delivery to servers- automate build, test and deployment every time you push to GitHub or BitBucket. Our platform empowers developers and their team to spend less time building and maintaining, instead, focus on writing code that powers their business. 

## Prerequisite 
This tutorial assumes you have already:
<ul>
<li>Have a git or mecurial installed in your machine</li>
<li><a href="https://www.distelli.com/signup" target="_blank">Created a free Distelli Account</a></li>
<li>Have a login to, at least, one of the two public repositories.</li>
<ul>
<li><a href="http://github.com" target="_blank">http://github.com</a></li>
<li><a href="http://bitbucket.com" target="_blank">http://bitbucket.com</a></li></ul>
<li> Have an <a href="https://aws.amazon.com/free/" target="_blank"> Amazon Web Service account</a></li>
</ul>

# Step 1. Create Key Pairs
Amazon EC2 uses public–key cryptography to encrypt and decrypt login information. We will have to create a Key Pair to login to our instance.

Navigate back to the **AWS Console**, then click on **EC2**. 

<img class="ttImages" src="/docs/assets/images/awsTutorial/AWS EC2.png" alt="AWS EC2" />

On the left pane, click on **Key Pairs**, then click on **Create Key Pair**

<img class="ttImages" src="/docs/assets/images/awsTutorial/Left Pane Key Pairs.png" alt="EC2 Key Pairs" />

Enter a name for your key, then click **Create**. The Key Pair will be automatically downloaded. You should move this key to a different directory. 

To use SSH client on Mac or Linux you will need to change the permissions of this key to **ready only**.

{{< callout-code >}}            
chmod 400 youKeyName.pem
{{< /callout-code >}}

# Step 3. Create A Security Group
### Prerequisites: 
Navigate to the left pane of your EC2, and click on **Security Groups**, then click **Create Security Group**.

<img class="ttImages" src="/images/EC2 Security Group.png" alt="EC2 Key Pairs" />

Fill out the **Security group name** and give it a **Description**.

On the **Inbound** tab, click **Add Rules** create the following 3 rules:

* Rule 1. Seletect HTTP under **Type**, make sure **Source** is set to **Anywhere*.
* Rule 2. Select HTTPS, make sure **Source** is set to **Anywhere**.
* Rule 3. Select SSH, make sure **Source** is set to **My IP**.

<img class="ttImages" src="/images/Security Group Popup.png" alt="EC2 Key Pairs" />


## Step 3. Launch an EC2 instance with Bitnami
Bitnami simplifies the configuration of your MEAN stack enviroment. It provides an EC2 image with the latest stable realease of Angular, Express, MongoDB, Git, PHP and RockMongo. The following steps will get you up and running with an EC2 image for MEAN stack development. 





## Step 2. 

