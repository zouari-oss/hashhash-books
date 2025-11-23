# Ai Notes

- **Zero-shot classification** is a technique that allows you to classify text into labels that the model hasn’t seen during training. You simply provide the text you want to classify, and a list of labels, and the model figures out which label fits best.
- **Text generation** is the process of creating coherent and contextually appropriate text, based on an input or prompt.
- **Fine-tuning** allows a pre-trained model to adapt to a new task. This approach uses the knowledge gained from training a model on a large dataset and applying it to a smaller, domain-specific dataset.
- The fine-tuning process is comprised of the following steps:
  1. **Prepare and upload training data**: You prepare the taxonomies the model must learn and securely share the training dataset using private links.
  2. **Train the new fine-tuned model**: TwelveLabs’s automated pipeline trains the model using your dataset.
  3. **Evaluate the fine-tuned model**: You evaluate the fine-tuned model quantitatively and qualitatively.
     a. **Quantitative evaluation**: Assess the model's performance using metrics such as mean average precision (mAP). TwelveLabs will provide the metrics for the private beta release.
     b. **Qualitative evaluation**: The fine-tuned model will be available in the Playground or accessible programmatically through the API for qualitative assessment.
  4. **Deploy the fine-tuned model**: TwelveLabs deploys the fine-tuned model to your environment.  
     Based on the evaluation results, you can retrain the model by repeating the cycle from the second step to improve its performance.
- An **agent** is a system that leverages an AI model to interact with its environment to achieve a user-defined objective. It combines reasoning, planning, and the execution of actions (often via external tools) to fulfill tasks.
