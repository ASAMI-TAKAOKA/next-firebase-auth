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
    comment_contents: string;
    created_at: string
  }];
}