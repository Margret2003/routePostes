export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
  // أضف أي خصائص أخرى تخص صاحب التعليق إذا كانت موجودة
}

export interface TopComment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: string | null;
  createdAt?: string; // أضفتها كاختياري احتياطياً
  updatedAt?: string;
}

export interface PostUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface PostType {
  body: string;
  bookmarked: boolean;
  commentsCount: number;
  createdAt: string;
  id: string;
  isShare: boolean;
  likes: any[]; // أو تحديد النوع المناسب لو عندك موديل للـ likes
  likesCount: number;
  privacy: "public" | "private"; // لو فيه خيارات تانية للـ privacy ممكن تضيفها
  sharedPost: any | null;
  sharesCount: number;
  topComment: TopComment | null;
  user: PostUser;
  _id: string;
}