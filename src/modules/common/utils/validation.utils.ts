import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateByClassOrThrow = async <T extends object>(
  cls: ClassConstructor<T>,
  plain: unknown,
): Promise<T> => {
  const instance = plainToInstance<T, unknown>(cls, plain);

  const result = await validate(instance, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  const errorMessages = result.flatMap(({ constraints }) =>
    Object.values(constraints || {}),
  );

  if (result.length > 0) {
    throw new BadRequestException(errorMessages);
  }

  return instance;
};
