import os
from Modules.enums import weights, n_weights, m_weights, position_values

class RatingMechanism:
    @staticmethod
    def rate(researchers_data):

        # Define a function to calculate the overall rating for a researcher

        def calculate_rating(researcher):
            rating = 0
            max_rating = 0
            for criterion, weight in weights.items():
                if criterion == 'position':
                     # Get the position value from the position_values dictionary
                    position_value = position_values.get(researcher[criterion], 0)
                    rating += position_value * weight
                elif criterion in n_weights:
                    # Give more weightage if the criterion has a value of 1
                    rating += researcher[criterion] * weight * 2
                    max_rating += 2 * weight  # Increase the maximum rating possible
                else:
                    if criterion in m_weights:
                        # Assign lower weights to the specific factors
                        weight *= float(os.environ.get("ALPHA"))
                    value = researcher[criterion]
                    if isinstance(value, str):
                        value = float(value)
                    rating += value * weight
                    max_rating += 10 * weight

            rating = (rating / max_rating) * 10
            rating = min(rating, 9.9)

            return rating


        # Calculate the rating for each researcher
        for researcher in researchers_data:
            researcher['rating'] = calculate_rating(researcher)

        # Sort researchers based on their ratings in descending order
        researchers_data.sort(key=lambda x: x['rating'], reverse=True)

        return str(round(researchers_data[0]['rating'], 2))
