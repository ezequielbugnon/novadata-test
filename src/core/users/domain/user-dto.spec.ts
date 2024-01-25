import { test, expect } from 'vitest'
import UserDTO from "./users-dto"
import { JwtAdapter } from '../../../libs/jwt'
import { BcryptAdapter } from '../../../libs/bcrypt'

test('test user-dto', () => {
    const user = new UserDTO("usuario 1", "123560", "something@gmail.com")

    expect(user.get()).contains
    ({ email: 'something@gmail.com', name: 'usuario 1' })
})