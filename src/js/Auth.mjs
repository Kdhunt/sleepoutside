const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
export default class Auth {
    constructor(useMockServer = false) {
        this.useMockServer = useMockServer;
    }
    async register(userData) {
        // Implement registration logic here
    }
    async login(userData) {
        if (this.useMockServer) {
            // Simulate server call
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate successful server response by returning a mock JWT token
                    const mockToken = 'mock.jwt.token';
                    localStorage.setItem('token', mockToken);
                    resolve({ token: mockToken }); // Resolve the promise with the token
                }, 1000); // Simulate delay of 1 second
            });
        } else {
            // Use real server call
            const response = await fetch(`${baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                throw new Error(data.message || 'Login failed');
            }
        }
    }
    async validateLogin() {
        if (this.useMockServer) {
            // Simulate server validation by returning some user data
            const token = localStorage.getItem('token');
            if (token) {
                return { username: 'example' };
            }
            return false;
        } else {
            // Use real server call
            const token = localStorage.getItem('token');
            if (token) {
                const response = await fetch(`${baseURL}/auth/validate`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    return data;
                } else {
                    throw new Error(data.message || 'Validation failed');
                }
            }
            return false;
        }
    }

    async logout() {
        localStorage.removeItem('token');
      window.location.href = '/';
    }
}