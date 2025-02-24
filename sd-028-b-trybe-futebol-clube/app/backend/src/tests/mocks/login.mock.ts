export const invalidLogin = {
  "email": "invalid@invalid.com",
  "password": "secret_admin"
}

export const validLogin = {
  "email": "admin@admin.com",
  "password": "secret_admin"
}

export const wrongPassword= {
  "email": "admin@admin.com",
  "password": "secret_"
}

export const invalidEmail = {
  "email": "invalidinvalid.com",
  "password": "secret_admin"
}

export const validUser = {
  "id": 1,
  "username": "Admin",
  "role": "admin",
  "email": "admin@admin.com",
  "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

export const invalidLoginNoPassword = {
  "email": "invalid@invalid.com",
}

export const invalidLoginNoEmail = {
  "password": "secret_admin"
}

export const validRole = {
  email: 'admin@admin.com',
  role: 'admin'
}

export const validToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDc0ODQ3OX0.W097sHTat6UQxLNjWZ21MTfApRkrRcVv2gkm_KdRtLI"

export const invalidToken = "Bearer eyJhbGciOiJIUzI1NflamengoiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDc0ODQ3OX0.W097sHTat6UQxLNjWZ21MTfApRkrRcVv2gkm_KdRtLI"