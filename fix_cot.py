import re

with open("tools/content/genai.js", "r") as f:
    text = f.read()

# Current questions
q26_old = """{p:"Generative AI Fundamentals",q:"When using a chain-of-thought prompt to solve a complex math problem, what is the primary reason the model's accuracy often improves?",o:["It forces the model to use an external calculator API","It allocates more compute tokens to the generation process, allowing intermediate logical steps to be explicitly articulated","It automatically switches the underlying foundation model to a larger parameter version","It removes safety filters that otherwise block math outputs"],a:1,w:"By generating intermediate steps, the model has \\"time to think\\" and conditionalize its final answer on explicitly generated logic, reducing errors."}"""

q27_old = """{p:"Generative AI Fundamentals",q:"A model using chain-of-thought reasoning arrives at the correct final answer, but one of its intermediate logical steps is factually incorrect. What is this phenomenon called?",o:["Hallucination in the reasoning trace","Zero-shot degradation","Temperature collapse","Overfitting"],a:0,w:"Models can sometimes arrive at correct answers via flawed reasoning; this is a form of hallucination within the reasoning steps."}"""

q28_old = """{p:"Generative AI Fundamentals",q:"To maximize the reliability of a complex generative AI task (like legal contract review), how should you verify the output?",o:["Rely on the model's self-evaluation by asking \\"Are you sure?\\"","Trust the output if the model used a chain-of-thought prompt","Implement independent verification, such as having a separate model or a human expert review the claims","Check if the model generated a confidence score above 90%"],a:2,w:"Independent verification (human-in-the-loop or separate verification models) is crucial because generative models can confidently hallucinate even when using chain-of-thought reasoning."}"""

q29_old = """{p:"Generative AI Fundamentals",q:"What is the primary benefit of using chain-of-thought prompting?",o:["It guarantees creativity regardless of input","It prevents overfitting during training","It encourages step-by-step reasoning, reducing logical errors","It increases token sampling temperature"],a:2,w:"Step-by-step reasoning cuts arithmetic/logic slips."}"""


# Revised questions based on user prompt criteria
q26_new = """{p:"Generative AI Fundamentals",q:"When using a chain-of-thought prompt to solve a complex problem, why does the model's performance often improve?",o:["It forces the model to verify facts against a secure external database","It requires the model to generate intermediate tokens, which can help decompose the problem before reaching a final answer","It automatically trains the model on new logic rules during the prompt execution","It guarantees that the final answer is logically correct"],a:1,w:"Generating intermediate reasoning tokens allows the model to break down a problem, but it does not guarantee correctness."}"""

q27_new = """{p:"Generative AI Fundamentals",q:"If a generative AI model provides a detailed chain-of-thought explanation for its answer, what should you keep in mind about that explanation?",o:["The explanation is a perfect map of the model's internal computational process","The explanation guarantees the final answer is correct","The explanation is generated text that sounds plausible but may not accurately reflect how the model arrived at the answer","The explanation will always be factually verified by the model"],a:2,w:"Generated explanations are text predictions; they are not necessarily faithful representations of internal model computation or truth."}"""

q28_new = """{p:"Generative AI Fundamentals",q:"How should you handle the results of a task that used chain-of-thought prompting?",o:["Trust the result completely because the reasoning steps prove it is correct","Use the reasoning steps to identify where the model's training data came from","Assume the model will self-correct any errors within the reasoning trace","Independently verify the results, as chain-of-thought prompting does not guarantee correctness"],a:3,w:"Even with reasoning tokens, models can confidently hallucinate. Independent verification is always required for critical tasks."}"""

q29_new = """{p:"Generative AI Fundamentals",q:"Which of the following is a limitation of chain-of-thought prompting?",o:["It decreases the number of tokens the model can generate","It only works on basic arithmetic problems","Additional reasoning tokens do not guarantee better or more accurate answers for every model or task","It prevents the model from being used as an AI agent"],a:2,w:"Different models and tasks respond differently to reasoning prompts; generating more reasoning steps does not automatically ensure a correct output."}"""

text = text.replace(q26_old, q26_new)
text = text.replace(q27_old, q27_new)
text = text.replace(q28_old, q28_new)
text = text.replace(q29_old, q29_new)

with open("tools/content/genai.js", "w") as f:
    f.write(text)

