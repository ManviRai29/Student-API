const http = require('http');
const url = require('url');

let students = [];

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (method === 'GET' && path === '/students') {
        return res.end(JSON.stringify(students));
    }

    if (method === 'GET' && path.startsWith('/students/')) {
        const id = path.split('/')[2];
        const student = students.find(s => s.id === id);

        if (!student) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                success: false,
                message: "Student not found"
            }));
        }

        return res.end(JSON.stringify(student));
    }

    if (method === 'POST' && path === '/students') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                if (!data.name || !data.email || !data.course || !data.year) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({
                        success: false,
                        message: "All fields are required"
                    }));
                }

                if (!isValidEmail(data.email)) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({
                        success: false,
                        message: "Invalid email format"
                    }));
                }

                if (data.year < 1 || data.year > 4) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({
                        success: false,
                        message: "Year must be between 1 and 4"
                    }));
                }

                const newStudent = {
                    id: Date.now().toString(),
                    name: data.name,
                    email: data.email,
                    course: data.course,
                    year: data.year
                };

                students.push(newStudent);

                res.statusCode = 201;
                res.end(JSON.stringify({
                    success: true,
                    data: newStudent
                }));

            } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    success: false,
                    message: "Invalid JSON"
                }));
            }
        });
    }

    else if (method === 'PUT' && path.startsWith('/students/')) {
        const id = path.split('/')[2];
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const index = students.findIndex(s => s.id === id);

            if (index === -1) {
                res.statusCode = 404;
                return res.end(JSON.stringify({
                    success: false,
                    message: "Student not found"
                }));
            }

            try {
                const data = JSON.parse(body);

                if (data.email && !isValidEmail(data.email)) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({
                        success: false,
                        message: "Invalid email"
                    }));
                }

                if (data.year && (data.year < 1 || data.year > 4)) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({
                        success: false,
                        message: "Year must be 1-4"
                    }));
                }

                students[index] = { ...students[index], ...data };

                res.end(JSON.stringify({
                    success: true,
                    data: students[index]
                }));

            } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    success: false,
                    message: "Invalid JSON"
                }));
            }
        });
    }

    else if (method === 'DELETE' && path.startsWith('/students/')) {
        const id = path.split('/')[2];
        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                success: false,
                message: "Student not found"
            }));
        }

        students.splice(index, 1);

        res.end(JSON.stringify({
            success: true,
            message: "Student deleted"
        }));
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            success: false,
            message: "Route not found"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});