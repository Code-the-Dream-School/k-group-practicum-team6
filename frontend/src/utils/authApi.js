const fakeUser = {
  email: 'test@test.com',
  password: '123456',
  name: 'TestUser',
  token: 'mock-jwt-token',
};


const authApi = {
  async login({ email, password }) {
    await new Promise((res) => setTimeout(res, 500)); // mock request

    if (email === fakeUser.email && password === fakeUser.password) {
      return {
        token: fakeUser.token,
        name: fakeUser.name,
      };
    }

    throw new Error('Invalid email or password');
  },

  async register() {
    await new Promise((res) => setTimeout(res, 500));
    return { message: 'Registered successfully' };
  },
};

export default authApi;
