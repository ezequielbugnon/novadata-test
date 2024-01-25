import { test, expect } from 'vitest'
import CategoryDto from './categories-dto'


test('test category-dto', () => {
    const category = new CategoryDto("category 1")

    expect(category.get()).toEqual
    ('category 1')
})