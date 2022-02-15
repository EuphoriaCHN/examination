import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

import Joi, { StrictSchemaMap, SchemaMap, isSchema } from 'joi';

@Injectable()
export class JoiValidatorPipe<T extends object, S = true> implements PipeTransform<T> {
  constructor(
    private schema: S extends true ? StrictSchemaMap<T> : SchemaMap<T>
  ) { }

  transform(value: T, metadata: ArgumentMetadata) {
    const schema = isSchema(this.schema) ? this.schema : Joi.object(this.schema);

    const { error } = schema.validate(value);

    if (error) throw new BadRequestException(`Validation failed: ${error.message}`);

    return value;
  }
}
