from flask import Flask, render_template, request, jsonify, json
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

def filter_recipes(data, cannot_have):
    filtered_data = data.copy()
    for ingredient in cannot_have:
        filtered_data = filtered_data[~filtered_data['Cleaned-Ingredients'].str.contains(ingredient.strip().lower())]
    return filtered_data

def convert_to_builtin_type(obj):
    if isinstance(obj, np.int64):
        return int(obj)

@app.route('/api/ingredform',methods =['POST'])
def index():
    if request.method == 'POST':
        print("called server")
        input_ingredients = request.form.getlist('input_ingredients')
        print(input_ingredients)
        cannot_have = request.form.getlist('cannot_have')

        unique_ingredients = set()
        for i in data['Cleaned-Ingredients']:
            for j in i.split(','):
                unique_ingredients.add(j.strip())        

        vectorizer = TfidfVectorizer(vocabulary=unique_ingredients)
        ingredient_matrix = vectorizer.fit_transform(data['Cleaned-Ingredients'])

        input_ingredients_str = ', '.join(input_ingredients)
        input_ingredients_vector = vectorizer.transform([input_ingredients_str])

        similarities = cosine_similarity(input_ingredients_vector, ingredient_matrix)

        cannot_have_str = ', '.join(cannot_have)
        print("cannot have string",cannot_have_str)
        filtered_data = filter_recipes(data, cannot_have)

        filtered_similarities = similarities[:, filtered_data.index]

        top_6_index = filtered_similarities.argsort()[0][-6:][::-1]


        top_recipes = []
        for i in top_6_index:
            recipe_info = {
                'name': filtered_data.iloc[i]['TranslatedRecipeName'],
                'ingredients': filtered_data.iloc[i]['TranslatedIngredients'],
                'time': filtered_data.iloc[i]['TotalTimeInMins'],
                'instructions': filtered_data.iloc[i]['TranslatedInstructions']
            }
            top_recipes.append(recipe_info)

        json_data = json.dumps(top_recipes, default=convert_to_builtin_type)
        decoded_data = json.loads(json_data)
        # return jsonify({'top_recipes': decoded_data})
        # # return jsonify({'input_ingredients': input_ingredients_str, 'cannot_have': cannot_have_str, 'top_recipes': decoded_data})
        
        
        # response = jsonify({'top_recipes': decoded_data})
        # # Set Cache-Control header to prevent caching
        # response.headers['Cache-Control'] = 'no-store'
        
        response = jsonify({'top_recipes': decoded_data})
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        return response
        # return response


    return jsonify({'error': 'Invalid request format'})
 

if __name__ == '__main__':
    data = pd.read_csv('Cleaned_Indian_Food_Dataset.csv', encoding='utf-8')
    app.run(host = '0.0.0.0', debug = True)


