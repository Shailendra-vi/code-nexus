const { spawn } = require('child_process');

const dockerExecuter = async (res, code, lang, input) => {
    let timeout = 60, memory = "256m", cpu_percentage = "0.5"
    let dockerArgs
    res.flushHeaders();

    switch (lang) {
        case 'python3':
            dockerArgs = [
                'run',
                '--rm',
                '--privileged',
                '-i',
                `--cpus=${cpu_percentage}`,
                `--memory=${memory}`,
                `--stop-timeout=${timeout}`,
                'python3_alpine:latest',
                'sh',
                '-c',
                `echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.py && base64 -d /input.b64 > /input.txt && stdbuf -oL python -u /code.py < /input.txt`
            ];
            break
        case 'python2':
            dockerArgs = [
                'run',
                '--rm',
                '--privileged',
                '-i',
                `--cpus=${cpu_percentage}`,
                `--memory=${memory}`,
                `--stop-timeout=${timeout}`,
                'python2_alpine:latest',
                'sh',
                '-c',
                `echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.py && base64 -d /input.b64 > /input.txt && stdbuf -oL python2 -u /code.py < /input.txt`
            ];
            break
        case 'cpp':
            dockerArgs = [
                'run',
                '--rm',
                '--privileged',
                '-i',
                `--cpus=${cpu_percentage}`,
                `--memory=${memory}`,
                `--stop-timeout=${timeout}`,
                'gcc_alpine:latest',
                'sh',
                '-c',
                `echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.cpp && base64 -d /input.b64 > /input.txt && stdbuf -oL g++ /code.cpp -o /code.out && /code.out < /input.txt`
            ];
            break
        case 'c':
            dockerArgs = [
                'run',
                '--rm',
                '--privileged',
                '-i',
                `--cpus=${cpu_percentage}`,
                `--memory=${memory}`,
                `--stop-timeout=${timeout}`,
                'gcc_alpine:latest',
                'sh',
                '-c',
                `echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.c && base64 -d /input.b64 > /input.txt && stdbuf -oL gcc /code.c -o /code.out && /code.out < /input.txt`
            ];
            break
        case 'java':
            dockerArgs = [
                'run',
                '--rm',
                '--privileged',
                '-i',
                `--cpus=${cpu_percentage}`,
                `--memory=${memory}`,
                `--stop-timeout=${timeout}`,
                'java11_alpine:latest',
                'sh',
                '-c',
                `echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /Main.java && base64 -d /input.b64 > /input.txt && stdbuf -oL javac /Main.java && java Main < /input.txt`
            ];
            break
        case 'javascript':
            dockerArgs = [
                'run',
                '--rm',
                '--privileged',
                '-i',
                `--cpus=${cpu_percentage}`,
                `--memory=${memory}`,
                `--stop-timeout=${timeout}`,
                'node_alpine:latest',
                'sh',
                '-c',
                `echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.js && base64 -d /input.b64 > /input.txt && stdbuf -oL node /code.js < /input.txt`
            ];
            break
        case 'golang':
            dockerArgs = [
                'run',
                '--rm',
                '--privileged',
                '-i',
                `--cpus=${cpu_percentage}`,
                `--memory=${memory}`,
                `--stop-timeout=${timeout}`,
                'golang_alpine:latest',
                'sh',
                '-c',
                `echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.go && base64 -d /input.b64 > /input.txt && stdbuf -oL go run /code.go < /input.txt`
            ];
            break
        default:
            res.write(`data: ${JSON.stringify({ status: 'exception', exitCode: 0 })}\n\n`);
            res.end()
    }



    const docker = spawn('docker', dockerArgs);

    docker.stdout.on('data', (data) => {
        console.log(`Docker stdout: ${data}`);

        res.write(`data: ${JSON.stringify({ output: data.toString() })}\n\n`);
    });

    docker.stderr.on('data', (data) => {
        console.log(`Docker stderr: ${data}`);

        res.write(`data: ${JSON.stringify({ error: data.toString() })}\n\n`);
    });

    docker.on('close', (code) => {
        console.log(`Docker process exited with code ${code}`);

        res.write(`data: ${JSON.stringify({ status: 'completed', exitCode: code })}\n\n`);
        res.end();
    });

    res.on('close', () => {
        console.log('Client disconnected');
        if (docker) docker.kill();
    });
};

module.exports = { dockerExecuter };
