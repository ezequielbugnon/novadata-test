import { test, expect } from 'vitest'
import PostsDto from './posts-dto'


test('test posts-dto', () => {
    const dto = {
        title: 'title',
        content: 'something',
        image: '',
        authorId: 1,
        categoryId: 2,
    }

    const post = new PostsDto(dto)

    expect(post.getPost()).toEqual
    (dto)
})