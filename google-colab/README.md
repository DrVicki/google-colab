# Google Colab

If you want to create a machine learning model but don't have a computer that can take the workload, Google Colab is the platform for you. In this tutorial, we'll learn how to use google colab.

## What is Google Colab

Google Colab, short for Colaboratory, is a free cloud-based platform provided by Google that allows users to write and execute Python code collaboratively in a Jupyter Notebook environment. 

***Google Collaboratory notebook***, is designed to facilitate machine learning (ML) and data science tasks by providing a virtual environment, Google colab python with access to free GPU resources.

## Benefits of Google Colab

Google Colab offers several benefits that make it a popular choice among data scientists, researchers, and machine learning practitioners. 

**Key features of Google Collaboratory notebook include**:

- **Free Access to GPUs**: Colab offers free GPU access, which is particularly useful for training machine learning models that require significant computational power.
- **No Setup Required**: Colab runs in the cloud, eliminating the need for users to set up and configure their own development environment. This makes it convenient for quick coding and collaboration.
- **Collaborative Editing**: Multiple users can work on the same Colab notebook simultaneously, making it a useful tool for collaborative projects.
- **Integration with Google Drive**: Colab is integrated with Google Drive, allowing users to save their work directly to their Google Drive account. This enables easy sharing and access to notebooks from different devices.
- **Support for Popular Libraries**: Colab comes pre-installed with many popular Python libraries for machine learning, data analysis, and visualization, such as TensorFlow, PyTorch, Matplotlib, and more.
- **Easy Sharing**: Colab notebooks can be easily shared just like Google Docs or Sheets. Users can provide a link to the notebook, and others can view or edit the code in real-time.

# Get Started with Google Colab

To start working with Google Collaboratory Notebook you first need to log in to your Google account, then go to this link https://colab.research.google.com// .

## Open Collaboratory (Colab) Notebook

On opening the website you will see a pop-up containing the following tabs;

![](https://github.com/DrVicki/google-colab/blob/main/google-colab/images/colab1.webp)

- **EXAMPLES**: Contain a number of Jupyter notebooks of various examples.
- **RECENT**: Jupyter notebook you have recently worked with.
- **GOOGLE DRIVE**: Jupyter notebook in your google drive.
- **GITHUB**: You can add Jupyter notebook from your GitHub but you first need to connect Colab with GitHub.
- **UPLOAD**: Upload from your local directory.

## Create Collaboratory (Colab) Notebook

You can also **create a new Jupyter Notebook** by clicking New Python3 Notebook or New Python2 Notebook at the bottom right corner.

### Notebook's Description



After creating a new notebook, you will be creating a Jupyter notebook with fikle name ```Untitled0.ipynb``` and save it to your google drive in a folder you will name **Colab Notebooks**.

Now it is essentially a Jupyter Notebook, so all commands of Jupyter Notebooks will work here. 

- Note: you can refer to the details in Getting Started with [Jupyter Notebook](https://www.geeksforgeeks.org/python/getting-started-with-jupyter-notebook-python/) .

**Let's talk about what is different here**:

**Change Runtime Environment**: Click the **"Runtime"** dropdown menu. Select **"Change runtime type"** . Select python2 or 3 from the **"Runtime type"** dropdown menu.

IMAGE 3

## Use GPU and TPU

Click the **"Runtime"** dropdown menu. Select **"Change runtime type"** . Now select anything(GPU, CPU, None) you want in the **"Hardware accelerator"** dropdown menu.

IMAGE 4

IMAGE 5

### Verify GPU in Colab

```
import tensorflow as tf
tf.test.gpu_device_name()
```

If GPU is connected it will output the following:

```'/device:GPU:0'```

Otherwise, it will output following:

```''```

### Verify TPU

```
import os

if 'COLAB_TPU_ADDR' not in os.environ:
  print('Not connected to TPU')
else:
  print(&quot;Connected to TPU&quot;)
```

  If GPU is connected it will output following

```Connected to TPU```

Otherwise, it will output following:

```Not connected to TPU```

## Install Python packages


Use can use ```pip``` to install any package. For example:

```! pip install pandas```

## Clone GitHub repos in Google Colab


Use the ``git clone`` command. For example:

```! git clone https://github.com/souvik3333/Testing-and-Debugging-Tools```

## Upload File on Google Colab


```from google.colab import files
uploaded = files.upload
```

Select "Choose file" and upload the file you want. Enable third-party cookies if they are disabled.

IMAGE 6

Then you can save it in a dataframe.


```
import io
df2 = pd.read_csv(io.BytesIO(uploaded['file_name.csv']))
```


## Upload File By Mounting Google Drive

To mount your drive inside the "``mntDrive``" folder execute the following;

```from google.colab import drive
drive.mount('/mntDrive'
```

Then you’ll see a link, click on the link, then allow access, copy the code that pops up, and paste it at **"Enter your authorization code:"**. Now to see all data in your google drive you need to execute the following:

``! ls '/mntDrive/My Drive&quot'``




IMAGE 7

## File Hierarchy In Google Colab

You can also see the file hierarchy by clicking ">" at the top left below the control buttons (CODE, TEXT, CELL).

IMAGE 8

IMAGE -8

## Download Files from Google Colab


Let's say you want to download "``file_name.csv``". You can copy the file to your google drive (In "data" folder; you need to create the "data" folder in google drive) by executing this:

```
cp file_name.csv &quot;/mntDrive/My Drive/data/renamed_file_name.csv&quot;
```

The file will be saved in the ``data`` folder with the "``renamed_file_name.csv``" name. Now you can directly download from there, Or, you can just open the file hierarchy and right-clicking will give a download option. 

**Download Jupyter Notebook**: Click the "File" dropdown menu at the top left corner. Choose "``download .ipynb``" or "``download .py``"

IMAGE 9

**Share Jupyter Notebook**: You can share your notebook by adding others' email addresses or by creating a shareable link.

IMAGE 10

IMAGE 11

## Conclusion

In conclusion, Google Colab stands out as a versatile and accessible platform for Python coding.






