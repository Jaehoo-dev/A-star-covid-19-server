import jwt from 'jsonwebtoken';

export function encode(data: Object): string {
  return jwt.sign(
    JSON.stringify(data),
    process.env.JWT_SECRET_KEY!,
  );
}

export function decode(token: string): any {
  return jwt.verify(
    token,
    process.env.JWT_SECRET_KEY!,
    (err, decoded) => {
      if (err || !decoded) return;
      return decoded;
    }
  );
}
