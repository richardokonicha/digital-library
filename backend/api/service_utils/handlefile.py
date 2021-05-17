# from pdf2image import convert_from_path
# pages = convert_from_path('pdf_file', 500)

import fitz

pdffile = "pp.pdf"
doc = fitz.open(pdffile)
page = doc.loadPage(0)  # number of page
pix = page.getPixmap()
output = "outfile.png"
pix.writePNG(output)