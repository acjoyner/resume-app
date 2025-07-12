export interface BlogPost {
  title: string;
  slug: string;
  summary: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Building My AI Resume Assistant - A Project Debrief',
    slug: 'building-my-ai-resume-assistant',
    summary: 'A deep dive into the journey of building a full-stack RAG application, including the struggles, key takeaways, and technologies used.',
    content: `This project was a deep dive into full-stack AI development, focused on building a Retrieval-Augmented Generation (RAG) system to serve as an intelligent chatbot for my resume. Over the course of approximately three weeks of dedicated, after-hours work, I encountered a variety of challenges that turned into invaluable learning opportunities.

The application was built using Python for the backend, Angular for the frontend, and leveraged a range of cloud services including Firebase, Google Cloud Console, Pinecone, and the OpenAI API. One of the earliest obstacles was that the chatbot wasn’t returning answers. After inspecting the logs, I discovered the issue: “No relevant source nodes found.” This became a foundational lesson—RAG systems are only as effective as the data they can retrieve.

This insight led to the next challenge: content ingestion. My original approach involved scraping my live Angular site, but since Python’s requests library doesn't execute JavaScript, it only returned an empty HTML shell. The solution was to bypass scraping entirely and instead send the site’s text content directly to the ingestion function via a dedicated API call—a far more reliable and scalable approach.

Cloud function deployment introduced another layer of complexity. I initially faced timeout errors, which taught me the importance of lazy initialization—deferring the creation of heavy clients like Pinecone and Firestore until inside the function handler, rather than initializing them globally.

I also ran into a Permission Denied error related to Firebase security rules. This led to a deep dive into cloud authentication and authorization. The fix involved creating a utility function to assign a custom admin claim to my Firebase user account. Crucially, I had to sign out and back in to refresh the token with the updated claim—another lesson in cloud identity management.

Further along, I hit memory limit errors. While I initially increased the limit manually in the Google Cloud Console, I later learned that specifying memory constraints programmatically (e.g., memory='512MiB') within the deployment configuration ensures consistent behavior across environments.

With the backend stabilized, the final hurdle was on the frontend. Although the function was executing successfully, the UI wasn't receiving a response—classic CORS issue. The culprit was an incorrect Content-Type header in the function's response. Adjusting this in the Python code resolved the problem and brought the app to full functionality.

Ultimately, this project was a hands-on exploration of the intricate layers of modern web and AI application development—from frontend integration and API debugging to authentication, cloud infrastructure, and system architecture. It reinforced the value of methodical troubleshooting and highlighted how even small misconfigurations can ripple across an otherwise well-structured system.`
  },
  {
    title: 'End-to-End Dog Vision: A Deep Learning Journey',
    slug: 'end-to-end-dog-vision',
    summary: 'A hands-on project to classify dog breeds using transfer learning and PyTorch, culminating in a functional web app with Gradio.',
    content: `As part of the Zero to Mastery: Machine Learning and AI Bootcamp by Daniel Bourke on Udemy, I recently completed an exciting deep learning project: Dog Vision v2—an end-to-end computer vision application designed to classify images of dogs using transfer learning.

This hands-on project helped reinforce my understanding of unstructured data workflows, model deployment pipelines, and the practical application of convolutional neural networks (CNNs) using PyTorch.

The goal was to create a deep learning model capable of identifying the breed of a dog from an image. Using a pretrained ResNet-50 model (transfer learning), we fine-tuned it on the ImageNet-style dog breeds dataset, then wrapped the model in a functional web app for user interaction.

Key features included:
- Image preprocessing and augmentation for robust training
- Custom CNN classifier fine-tuned on top of ResNet-50
- Evaluation with accuracy, loss, and confusion matrix
- Model export and inference scripting
- Interactive Gradio-based UI for testing predictions

What I Learned:
1. Transfer Learning in Practice
   Leveraging ResNet-50 drastically reduced training time and improved model performance. This project illustrated how powerful pretrained models are for domain-specific tasks like dog breed classification.

2. Data Handling with Unstructured Inputs
   Working with image data brought its own challenges—resizing, normalization, and proper label encoding were crucial for model success.

3. Model Evaluation Techniques
   Understanding model behavior through loss curves, accuracy tracking, and error analysis (e.g., misclassified breeds) helped reinforce how to validate and debug deep learning models effectively.

4. Gradio for Fast Prototyping
   Deploying the model using Gradio made it easy to build a testable UI, enabling real-time predictions on user-uploaded images. This hands-on experience was my first step toward turning machine learning models into usable applications.

What’s Next:
This project served as a launching pad into deeper AI development. I plan to integrate future vision models into real-world applications, using tools like Firebase, Angular, and the OpenAI ecosystem (as I did in my AI resume chatbot project).

Resources:
- Dog Vision Notebook on Google Colab: https://colab.research.google.com/github/mrdbourke/zero-to-mastery-ml/blob/master/section-4-unstructured-data-projects/end-to-end-dog-vision-v2.ipynb
- Gradio: https://www.gradio.app/
- Zero to Mastery Course: https://www.udemy.com/course/zero-to-mastery-ml`
  }
];
