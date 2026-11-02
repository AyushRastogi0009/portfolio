export interface CodeSnippet {
  file: string;
  lines: string[];
}

/** Illustrative code drawn onto the floating windows. Not real production code. */
export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    file: 'tenant.js',
    lines: [
      '// connect each user to their site',
      'async function getSiteDb(siteId) {',
      '  const cfg = await mainDb.getSiteConfig(siteId);',
      '  return pool(cfg.server, cfg.database);',
      '}',
      '',
      'router.use(async (req, res, next) => {',
      '  req.db = await getSiteDb(req.user.siteId);',
      '  next();',
      '});',
    ],
  },
  {
    file: 'reports.routes.js',
    lines: [
      "router.get('/reports/summary', auth, async (req, res) => {",
      '  const rs = await req.db.request()',
      "    .input('from', sql.Date, req.query.from)",
      "    .input('to', sql.Date, req.query.to)",
      "    .execute('usp_CallSummary');",
      '',
      '  res.json(rs.recordset);',
      '});',
    ],
  },
  {
    file: 'dashboard.component.ts',
    lines: [
      '@Component({',
      "  selector: 'app-dashboard',",
      "  templateUrl: './dashboard.component.html'",
      '})',
      'export class DashboardComponent implements OnInit {',
      '  stats: Stats[] = [];',
      '  ngOnInit() {',
      '    this.api.getStats().subscribe(s => this.stats = s);',
      '  }',
      '}',
    ],
  },
  {
    file: 'pdf.service.js',
    lines: [
      'const doc = new PDFDocument({ bufferPages: false });',
      'doc.pipe(fs.createWriteStream(file));',
      '',
      'request.stream = true;',
      "request.on('row', row => doc.text(format(row)));",
      "request.on('done', () => doc.end());",
    ],
  },
  {
    file: 'usp_CallSummary.sql',
    lines: [
      '-- summary of calls for one site',
      'EXEC usp_CallSummary',
      "  @From = '2026-01-01',",
      "  @To   = '2026-01-31';",
      '',
      'SELECT Department, COUNT(*) AS Calls',
      'FROM CallDetail',
      'GROUP BY Department;',
    ],
  },
  {
    file: 'excel.service.js',
    lines: [
      'const wb = new ExcelJS.Workbook();',
      "const ws = wb.addWorksheet('Summary');",
      '',
      'ws.addRows(rows);',
      'ws.getRow(1).font = { bold: true };',
      'await wb.xlsx.writeFile(out);',
    ],
  },
  {
    file: 'login.js',
    lines: [
      "app.post('/login', async (req, res) => {",
      '  const user = await verify(req.body);',
      '  if (!user) return res.status(401).end();',
      '  res.json({ siteId: user.siteId, role: user.role });',
      '});',
    ],
  },
];

/** x, y, z and y-rotation of each window. Windows sit to the sides so the centre stays calm. */
export const CARD_LAYOUT: ReadonlyArray<readonly [number, number, number, number]> = [
  [6.5, 1.5, -2, -0.22],
  [-11, -0.5, -8, 0.3],
  [8.5, -1.0, -14, -0.25],
  [-9.5, 2.2, -20, 0.28],
  [7.5, 1.8, -26, -0.2],
  [-10, -1.2, -32, 0.3],
  [8.0, 0.0, -38, -0.22],
];
