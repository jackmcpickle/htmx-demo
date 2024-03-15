export interface ContactList {
    name: string;
    email: string;

}

export interface IndexProps {
    name: string;
    list: ContactList[]
}

export const getIndex = (props: IndexProps) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTMX Demo</title>
    <script src="/htmx.min.js"></script>
</head>
<body>
    <h1>${props.name}</h1>

${getContactForm()}
${getContactList(props.list)}

</body>
</html>
`;

export const getContactForm = () => `
    <form class="contact-form" hx-post="/contacts">
        <input name="name" type="text" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Your email" required />
        <button type="submit">Submit</button>
    </form>
`
export const getContactList = (list: ContactList[]) =>
    `<ul class="">
    ${list
        .map(
            (contact) => `<li>${contact.name}: ${contact.email}</li>`,
        )
        .join('\n')}
    </ul>`;
