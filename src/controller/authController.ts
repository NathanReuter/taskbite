import { Request, Response } from 'express';
import {
  createUser,
  findUserByEmail,
  NewUserPayload,
  removeUser,
} from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface TypedRequest<TParams, TBody> extends Request<TParams> {
  body: TBody | never;
  params: TParams | never;
}

interface LoginCredential {
  email: string;
  password: string;
}

export async function signup(
  req: TypedRequest<never, NewUserPayload>,
  res: Response,
) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Wrong new user payload',
      });
    }
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exist',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await createUser({
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email,
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiresIn,
      },
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
}

export async function login(
  req: TypedRequest<never, LoginCredential>,
  res: Response,
) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing email or password',
    });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: 'Invalid password',
    });
  }

  const token = jwt.sign({ email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  res.status(200).json({
    token,
  });
}
export async function deleteUser(
  req: TypedRequest<NonNullable<unknown>, never>,
  res: Response,
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const email = req?.user?.email;
  if (!email) {
    return res.status(400).json({
      message: 'Missing email',
    });
  }
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  await removeUser({ email });
  res.status(200).json({
    message: `User deleted ${email}`,
  });
}
