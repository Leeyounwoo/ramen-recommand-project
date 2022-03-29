from turtle import right
import pandas as pd
from ..models import Analysis, Composition, Fond, Member, Nutrient, Ramen

def member():
    def byte_to_int(x):
        return int.from_bytes(x, byteorder='big')

    members = Member.objects.values('member_id', 'age', 'gender', 'fond_id').all()
    fonds = Fond.objects.values().all()
    members = pd.DataFrame.from_records(members)
    fonds = pd.DataFrame.from_records(fonds)
    
    user = pd.merge(left=members, right=fonds, how='inner', on='fond_id')

    for key in ['ingredient_garlic', 'ingredient_green_onion', 'ingredient_none', 'ingredient_pepper', 'topping_dumpling', 'topping_none', 'topping_tteok']:
        user[key] = user[key].map(byte_to_int)
    return user 


def ramen():
    ramens = Ramen.objects.values('ramen_id', 'composition_id', 'analysis_id', 'nutrient_id').all()
    ramens = pd.DataFrame.from_records(ramens)
    
    nutrients = Nutrient.objects.values().all()
    nutrients = pd.DataFrame.from_records(nutrients)
    
    compositions = Composition.objects.values().all()
    compositions = pd.DataFrame.from_records(compositions)
    
    analyses = Analysis.objects.values().all()
    analyses = pd.DataFrame.from_records(analyses)
    
    ramens = pd.merge(left=ramens, right=nutrients, how='inner', left_on='nutrient_id', right_on='nutrient_id')
    ramens = pd.merge(left=ramens, right=compositions, how='inner', left_on='composition_id', right_on='composition_id')
    ramens = pd.merge(left=ramens, right=analyses, how='inner', left_on='analysis_id', right_on='analysis_id')
    ramens = ramens.drop(['composition_id', 'analysis_id', 'nutrient_id'], axis='columns')
  
    return ramens  
   
    
    
    


