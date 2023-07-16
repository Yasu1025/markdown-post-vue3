export interface Post {
  id: string
  title: string
  createdAt: string
  markdown: string
  html: string
}

export interface TimelinePost extends Omit<Post, 'created'> {
  createdAt: DateTime
}
