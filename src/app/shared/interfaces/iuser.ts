export interface IUser {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  createdAt: string;
  passwordChangedAt: string;
  comments:comment[];
}
interface comment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  createdAt: string;
}

interface CommentCreator {
  _id: string;
  name: string;
  photo: string;
}
