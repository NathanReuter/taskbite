export function checkEnv() {
  const requiredEnvVar = [
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE',
    'DB_HOST',
    'JWT_TOKEN_SECRET',
  ];
  const missingEnvVar = requiredEnvVar.filter(
    (variable) => !process.env[variable],
  );

  if (missingEnvVar.length > 0) {
    throw new Error(
      `Missing enviroment variables: ${missingEnvVar.join(', ')}`,
    );
  }
}
