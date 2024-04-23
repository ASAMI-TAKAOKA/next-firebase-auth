export interface PostInputs {
  title: string;
  body: string;
  category: string;
}

export interface PostData extends PostInputs {
  id: number;
  user_uid: string;
  created_at: string;
  comments: [{
    id: number;
    comment_content: string;
    created_at: string
  }];
}

export interface CommentInputs {
  content: string;
}

export interface CommentData extends CommentInputs {
  id: number;
  created_at: string;
}

export interface BabyFoodInputs {
  title: string;
  body: string;
  meal_time: string;
  dish_name: string;
  meal_category: string;
}

export interface BabyFoodData extends BabyFoodInputs {
  id: number;
  user_uid: string;
  created_at: string;
}