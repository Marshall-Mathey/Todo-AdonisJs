import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Todo from "App/Models/Todo";

export default class TodosController {
  public async index({ view }: HttpContextContract) {
    const todos = await Todo.all();
    return view.render("pages/index", { todos });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("pages/create");
  }

  public async store({ request, response }: HttpContextContract) {
    const todo = new Todo();
    const data = request.body();

    // return data
    await todo.merge({ ...data }).save();
    return response.redirect().toRoute("home");
  }

  public async show({ params, view }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);
    return view.render("pages/show", { todo });
  }

  public async edit({ params, view }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);
    return view.render("pages/edit", { todo });
  }

  public async update({ request, response, params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);
    const data = request.body();

    // return data
    await todo.merge({ ...data }).save();
    return response.redirect().toRoute("home");
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const todo = await Todo.findOrFail(params.id);
      await todo.delete();
      return response.redirect().toRoute('home')
    } catch (error) {
      return error
    }
  }
}
