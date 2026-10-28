import bcrypt from 'bcryptjs';

process.stdout.on('error', (err) => {
  if (err.code === 'EPIPE') {
    process.exit(0);
  }
  throw err;
});

const askPassword = () =>
  new Promise((resolve, reject) => {
    process.stdin.setEncoding('utf8');
    process.stdin.resume();
    process.stdout.write('Enter your admin Password: ');

    let input = '';

    const cleanup = () => {
      process.stdin.off('data', onData);
      process.stdin.off('end', onEnd);
      process.stdin.off('error', onError);
    };

    const onData = (chunk) => {
      input += chunk;

      if (input.includes('\n')) {
        cleanup();
        resolve(input.replace(/\r?\n$/, ''));
      }
    };

    const onEnd = () => {
      cleanup();
      reject(new Error('Input stream closed before the password was entered.'));
    };

    const onError = (err) => {
      cleanup();
      reject(err);
    };

    process.stdin.on('data', onData);
    process.stdin.on('end', onEnd);
    process.stdin.on('error', onError);
  });

try {
  const password = await askPassword();

  if (password.length < 8) {
    throw new Error('Use a password of at least 8 characters.');
  }

  const hash = await bcrypt.hash(password, 8);
  console.log('\nADMIN_PASSWORD_HASH=' + hash);
} catch (error) {
  console.error(error.message);
  process.exit(1);
} finally {
  process.stdin.pause();
}