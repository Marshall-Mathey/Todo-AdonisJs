/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
/**
 * Auth routes
 */
Route.get('/login', 'AuthController.loginForm').as('loginForm').middleware(['guest'])
Route.post('/login', 'AuthController.login').as('login')

Route.get('/register', 'AuthController.registerForm').as('registerForm').middleware(['guest'])
Route.post('/register', 'AuthController.register').as('register')

Route.delete('/logout', 'AuthController.logout').as('logout')

/**
 * Todo
 */
Route.group(() => {
    Route.get('/', 'TodosController.index').as('home')

    Route.get('/create', 'TodosController.create').as('todo.create')
    Route.post('/create', 'TodosController.store')
    
    Route.get('/:id', 'TodosController.show').as('todo.show')
    
    Route.get('/:id/edit', 'TodosController.edit').as('todo.edit')
    Route.patch('/:id', 'TodosController.update').as('todo.update')
    
    Route.delete('/:id', 'TodosController.destroy').as('todo.delete')
}).middleware(['auth'])