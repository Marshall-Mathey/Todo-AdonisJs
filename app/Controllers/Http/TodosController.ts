import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Todo from "App/Models/Todo";
import TodoValidator from "App/Validators/TodoValidator";

export default class TodosController {
  public async index({ view }: HttpContextContract) {
    const todos = await Todo.all();
    return view.render("Todo/index", { todos });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("Todo/create");
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const todo = new Todo();
      const data = await request.validate(TodoValidator);

      await todo.merge({ ...data }).save();
      session.flash({ success: "Todo added successfully" });
      return response.redirect().toRoute("home");
    } catch (error) {
      throw error;
      return response.redirect().back();
    }
  }

  public async show({ params, view }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);
    return view.render("Todo/show", { todo });
  }

  public async edit({ params, view }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);
    return view.render("Todo/edit", { todo });
  }

  public async update({
    request,
    response,
    params,
    session,
  }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);
    todo.is_completed = !!request.input("completed");
    await todo.save();

    //const data = request.body();

    // return data
    //await todo.merge({ ...data }).save();
    session.flash({ success: "Todo updated successfully" });
    return response.redirect().toRoute("home");
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const todo = await Todo.findOrFail(params.id);
      await todo.delete();
      return response.redirect().toRoute("home");
    } catch (error) {
      throw error;
    }
  }
}
