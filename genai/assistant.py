
# Simple GenAI explanation module

import openai

def explain_medicine(data):

    prompt = f'''
    Explain if this medicine is safe:

    {data}

    Give simple explanation.
    '''

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":prompt}]
    )

    return response.choices[0].message.content
