import { Request, Response } from 'express';
import { User, UserI } from '../../models/authorization/User';

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: UserI[] = await User.findAll();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, is_active = 'ACTIVE', avatar } = req.body;
    try {
      if (!username || !email || !password) {
        res.status(400).json({ error: 'username, email y password son obligatorios' });
        return;
      }

      const exists = await User.findOne({ where: { email } });
      if (exists) {
        res.status(409).json({ error: 'El email ya está registrado' });
        return;
      }

      const newUser = await User.create({
        username,
        email,
        password,
        is_active,
        avatar,
      });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  }
}
