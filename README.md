# Griddy

install: 
`npm i react-datagriddy`

define rows and columns: 
```
const columns = ['Name', 'Age', 'Country'];`
const rows = [
    ['John', '25', 'USA'],
    ['Alice', '30', 'Canada'],
    ['Bob', '22', 'UK'],
  ];
```

component: 
`<DataGrid columns={columns} rows={rows} selectable={true} />`


## License

MIT
