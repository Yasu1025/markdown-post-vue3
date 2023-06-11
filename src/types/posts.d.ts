export interface Post {
  id: string
  title: string
  createdAt: string
}

export interface TimelinePost extends Omit<Post, 'created'> {
  createdAt: DateTime
}
