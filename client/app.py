from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

def get_user_limits():
    cannot_have = request.form.get('cannot_have', '').strip().lower().split(',')
    return cannot_have

def filter_recipes(data, cannot_have):
    filtered_data = data.copy()
    for ingredient in cannot_have:
        filtered_data = filtered_data[~filtered_data['Cleaned-Ingredients'].str.contains(ingredient.strip().lower())]
    return filtered_data

@app.route('/ingredientform', methods=['POST'])
def index():
    if request.method == 'POST':
        input_ingredients = request.form.get('input_ingredients', '').split(',')
        cannot_have = get_user_limits()

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

    #     return render_template('Take.html', top_recipes=top_recipes, input_ingredients=input_ingredients_str, cannot_have=cannot_have_str)

    # return render_template('Take.html', top_recipes=None, input_ingredients=None, cannot_have=None)
    
        return jsonify({'top_recipes': top_recipes, 'input_ingredients': input_ingredients_str, 'cannot_have': cannot_have_str})

    return jsonify({'error': 'Invalid request format'})
    
    
    # request_data = request.get_json()

    # if request_data:
    #     input_ingredients = request_data.get('input_ingredients', '').split(',')
    #     cannot_have = get_user_limits(request_data)

    #     unique_ingredients = set()
    #     for i in data['Cleaned-Ingredients']:
    #         for j in i.split(','):
    #             unique_ingredients.add(j.strip())

    #     vectorizer = TfidfVectorizer(vocabulary=unique_ingredients)
    #     ingredient_matrix = vectorizer.fit_transform(data['Cleaned-Ingredients'])

    #     input_ingredients_str = ', '.join(input_ingredients)
    #     input_ingredients_vector = vectorizer.transform([input_ingredients_str])

    #     similarities = cosine_similarity(input_ingredients_vector, ingredient_matrix)

    #     cannot_have_str = ', '.join(cannot_have)
    #     filtered_data = filter_recipes(data, cannot_have)

    #     filtered_similarities = similarities[:, filtered_data.index]

    #     top_6_index = filtered_similarities.argsort()[0][-6:][::-1]

    #     top_recipes = []
    #     for i in top_6_index:
    #         recipe_info = {
    #             'name': filtered_data.iloc[i]['TranslatedRecipeName'],
    #             'ingredients': filtered_data.iloc[i]['TranslatedIngredients'],
    #             'time': filtered_data.iloc[i]['TotalTimeInMins'],
    #             'instructions': filtered_data.iloc[i]['TranslatedInstructions']
    #         }
    #         top_recipes.append(recipe_info)

    #     return jsonify({'top_recipes': top_recipes, 'input_ingredients': input_ingredients_str, 'cannot_have': cannot_have_str})

    # return jsonify({'error': 'Invalid request format'})

if __name__ == '__main__':
    data = pd.read_csv('Cleaned_Indian_Food_Dataset.csv', encoding='utf-8')
    app.run(debug=True)



