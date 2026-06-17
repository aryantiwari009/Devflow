interface Tag {
  _id: string;
  name: string;
}

interface Author { 
    _id: string;
    name: string;
    image: string;
}

interface Question {
    _id: string;
    title: string;
    description: string;
    tags: Tag[];
    upvotes: number;
    author: Author;
    answers: number;
    views: number;
    createdAt: Date;
}