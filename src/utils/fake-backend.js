export function configureFakeBackend () {
  let users = [
    {
      id: 1,
      username: 'tpdov.kpr@gmail.com',
      password: 'Password@1',
      firstName: 'Endrit',
      lastName: 'Kane',
      gender: 'M',
      test: 'GD',
      status: 'Pending',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJFbmRyaXQgS2FuZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1Mzg3MTM1OCwiZXhwIjoxNTU0MzIwODEwLCJqdGkiOiJlZTM5ODc2NS1hMzFmLTRhNDEtYWYzMC1mOWEyYzE1OGE0NzgifQ.2bWGDxPk0wd6ZETMXAEWYYHhg26kAkJFg-jHY29oFoE'
    },
    {
      id: 2,
      username: 'test@gmail.com',
      password: 'A12345678',
      firstName: 'Demo',
      lastName: 'User',
      gender: 'M',
      test: 'GD',
      status: 'Pending',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJFbmRyaXQgS2FuZSIsInJvbGUiOiJub25hZG1pbiIsImlhdCI6MTU1Mzg3MTM1OCwiZXhwIjoxNTU0MzIwODI4LCJqdGkiOiI1NDNmNzMzYi03YTQ5LTRkYTctYWI1MC1kMDA3ZGFjN2ZmMmIifQ.AWBinnIZ4nRTzRRnMA3wmTANZCQEjFa4_7Y9xqxBWiE'
    }
  ]

  let realFetch = window.fetch
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // authenticate
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          // get parameters from post request
          let params = JSON.parse(opts.body)

          // find if any user matches login credentials
          let filteredUsers = users.filter((user) => {
            return user.username === params.username && user.password === params.password
          })

          if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            let user = filteredUsers[0]

            let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: user.token
            }
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) })
          } else {
            // else return error
            reject(new Error('Username or password is incorrect'))
          }

          return
        }

        // get users
        if (url.endsWith('/users') && opts.method === 'GET') {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) })
          } else {
            // return 401 not authorised if token is null or invalid
            reject(new Error('Unauthorised'))
          }

          return
        }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response))
      }, 500)
    })
  }
}
