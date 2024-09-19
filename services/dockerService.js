const { exec } = require('child_process');

const dockerExecuter = async (code, lang, input) => {
    let command = '', timeout = 60, memory = "256m", cpu_percentage = "0.5", storage_size = "500m"

    switch (lang.toLowerCase()) {
        case 'python3':
            command = `docker run --rm --privileged --cpus="${cpu_percentage}" --memory=${memory} --stop-timeout=${timeout} python:3.9-alpine sh -c "echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.py && base64 -d /input.b64 > /input.txt && python /code.py < /input.txt | base64"`
            break
        case 'python2':
            command = `docker run --rm --privileged --cpus="${cpu_percentage}" --memory=${memory} --stop-timeout=${timeout} python:2.7-alpine sh -c "echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.py && base64 -d /input.b64 > /input.txt && python /code.py < /input.txt | base64"`
            break
        case 'cpp':
            command = `docker run --rm --privileged --cpus="${cpu_percentage}" --memory=${memory} --stop-timeout=${timeout} gcc_alpine:latest sh -c "echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.cpp && base64 -d /input.b64 > /input.txt && g++ /code.cpp -o /code.out && /code.out < /input.txt | base64"`
            break
        case 'c':
            command = `docker run --rm --privileged --cpus="${cpu_percentage}" --memory=${memory} --stop-timeout=${timeout} gcc_alpine:latest sh -c "echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.c && base64 -d /input.b64 > /input.txt && gcc /code.c -o /code.out && /code.out < /input.txt | base64"`
            break
        case 'java':
            command = `docker run --rm --privileged --cpus="${cpu_percentage}" --memory=${memory} --stop-timeout=${timeout} java_alpine:latest sh -c "echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /Main.java && base64 -d /input.b64 > /input.txt && javac /Main.java && java Main < /input.txt | base64"`
            break;
        case 'javascript':
            command = `docker run --rm --privileged --cpus="${cpu_percentage}" --memory=${memory} --stop-timeout=${timeout} node_alpine:latest sh -c "echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.js && base64 -d /input.b64 > /input.txt && node /code.js < /input.txt | base64"`
            break
        case 'golang':
            command = `docker run --rm --privileged --cpus="${cpu_percentage}" --memory=${memory} --stop-timeout=${timeout} go_alpine:latest sh -c "echo '${code}' > /code.b64 && echo '${input}' > /input.b64 && base64 -d /code.b64 > /code.go && base64 -d /input.b64 > /input.txt && go run /code.go < /input.txt | base64"`
            break
        default:
            throw new Error(`Unsupported language: ${lang}`)
    }

    try {
        const output = await execPromise(command)
        return output
    } catch (error) {
        console.error('Error executing docker command:', error)
        return { status: "exception", message: error }
    }
};

const execPromise = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ status: "error", stderr: stderr || error });
            } else {
                resolve({ status: "success", stdout: stdout.trim() });
            }
        });
    });
};

module.exports = { dockerExecuter };
