const varianten = [
  {
    id: 1,
    produktschluessel: "F*",
    vonmodelljahr: "6: Modelljahr 2005/06",
    bismodelljahr: "F: Modelljahr 2005/06",
    motortyp: "",
    getriebetyp: "",
    typ: "Teilvariante",
    label: false,
    varianten: [
      // Ausstattungsdefinitionen
      {
        id: 2,
        produktschluessel: "Ausstattungsdefinitionen",
        vonmodelljahr: "Operator",
        bismodelljahr: "Ausstattungsnr",
        motortyp: "Bezeichnung",
        getriebetyp: "Verknüpfung",
        typ: "Ausstattungsdefinition",
        label: true,
        varianten: [
          {
            id: 3,
            produktschluessel: "Ausstattungsdefinition",
            vonmodelljahr: "+ (enthält)",
            bismodelljahr: "XMA",
            motortyp: "HIMMEL MIT LEDER BEZOGEN",
            getriebetyp: "und",
            typ: "Ausstattungsdefinition",
            label: false,
            varianten: [],
          },
          {
            id: 4,
            produktschluessel: "Ausstattungsdefinition",
            vonmodelljahr: "- (enthält nicht)",
            bismodelljahr: "MAX",
            motortyp: "LEDER BEZOGEN",
            getriebetyp: "und",
            typ: "Ausstattungsdefinition",
            label: false,
            varianten: [],
          },
        ],
      },
      // CNummerdefinitionen
      {
        id: 5,
        produktschluessel: "C-Nummerdefinitionen",
        vonmodelljahr: "Operator",
        bismodelljahr: "Cnr",
        motortyp: "Bezeichnung",
        getriebetyp: "Verknüpfung",
        typ: "CNummerdefinition",
        label: true,
        varianten: [
          {
            id: 6,
            produktschluessel: "C-Nummerdefinition",
            vonmodelljahr: "+ (enthält)",
            bismodelljahr: "C02-USA",
            motortyp: "USA",
            getriebetyp: "und",
            typ: "CNummerdefinition",
            label: false,
            varianten: [],
          },
          {
            id: 7,
            produktschluessel: "C-Nummerdefinition",
            vonmodelljahr: "- (enthält nicht)",
            bismodelljahr: "C10-SCHWEIZ",
            motortyp: "SCHWEIZ",
            getriebetyp: "und",
            typ: "CNummerdefinition",
            label: false,
            varianten: [],
          },
        ],
      },
    ]
  },
];


const varianten2 = [
  {
    id: 1,
    produktschluessel: [
      "1"
    ],
    name: "F*",
    vonmodelljahr: "6: Modelljahr 2005/06",
    bismodelljahr: "F: Modelljahr 2005/06",
    motortyp: "",
    getriebetyp: "",
    typ: "Teilvariante",
    label: false,
  },
  {
    id: 2,
    produktschluessel: [
      "1", "2"
    ],
    vonmodelljahr: "Operator",
    bismodelljahr: "Ausstattungsnr",
    motortyp: "Bezeichnung",
    getriebetyp: "Verknüpfung",
    typ: "Ausstattungsdefinitionen",
    label: true,
  },
  {
    id: 3,
    produktschluessel: [
      "1", "2", "3"
    ],
    vonmodelljahr: "+ (enthält)",
    bismodelljahr: "XMA",
    motortyp: "HIMMEL MIT LEDER BEZOGEN",
    getriebetyp: "und",
    typ: "Ausstattungsdefinition",
    label: false,
  },
  {
    id: 4,
    produktschluessel: [
      "1", "2", "4"
    ],
    vonmodelljahr: "- (enthält nicht)",
    bismodelljahr: "MAX",
    motortyp: "LEDER BEZOGEN",
    getriebetyp: "und",
    typ: "Ausstattungsdefinition",
    label: false,
  },
  {
    id: 5,
    produktschluessel: [
      "1", "3"
    ],
    vonmodelljahr: "Operator",
    bismodelljahr: "Cnr",
    motortyp: "Bezeichnung",
    getriebetyp: "Verknüpfung",
    typ: "CNummerdefinitionenen",
    label: true,
  },
  {
    id: 6,
    produktschluessel: [
      "1", "3", "4"
    ],
    vonmodelljahr: "+ (enthält)",
    bismodelljahr: "C02-USA",
    motortyp: "USA",
    getriebetyp: "und",
    typ: "CNummerdefinition",
    label: false,
  },
  {
    id: 7,
    produktschluessel: [
      "1", "3", "5"
    ],
    vonmodelljahr: "+ (enthält)",
    bismodelljahr: "C10-SCHWEIZ",
    motortyp: "SCHWEIZ",
    getriebetyp: "und",
    typ: "CNummerdefinition",
    label: false,
  },
];

const modelljahrTeilvariante = [
  { value: "6: Modelljahr 2005/06", label: "6: Modelljahr 2005/06" },
  { value: "D: Modelljahr 2012/13", label: "D: Modelljahr 2012/13" },
  { value: 1, label: "E: Modelljahr 2013/14" },
  { value: "F: Modelljahr 2005/06", label: "F: Modelljahr 2005/06" },
  { value: 3, label: "G: Modelljahr 2015/16" },
  { value: 4, label: "H: Modelljahr 2016/17" },
  { value: 5, label: "J: Modelljahr 2017/18" },
  { value: 6, label: "K: Modelljahr 2018/19" },
  { value: 7, label: "L: Modelljahr 2019/20" },
  { value: 8, label: "T: Modelljahr 1995/96" },
  { value: 9, label: "O: Modelljahr 1995/96" },
  { value: 10, label: "M: Modelljahr 1995/96" },
  { value: 11, label: "N: Modelljahr 1995/96" },
];

const versandarten = [
  { value: 0, label: "Hauseigene Fahrzeuge" },
  { value: 1, label: "BRD konserviert" },
  { value: 2, label: "alle ausser USA nicht konserviert" },
  { value: 3, label: "Selbstabholer USA Tourist" },
  { value: 4, label: "Übersee Wachsen" },
  { value: 5, label: "Selbstabholer Deutschland" },
  { value: 6, label: "Selbstabholer Export Tourist" },
  { value: 7, label: "Luftfracht" },
];

const inummern = [
  { value: 0, label: "Seitenverkleidung Fond Leder n. Wahl (3.1a)" },
  { value: 1, label: "Sitzmittelbahn in Leder aus Angebot farblich abweichend" },
  { value: 2, label: "Vorder- u. Ruecksitze Leder n. Wahl" },
  { value: 3, label: "Verkleidung A-Saeulen/Windschutz-rahmen abweichende Lederzuordnung (1.0a)" },
  { value: 4, label: "SPORT CHRONO / KOMPASS BORDEAUXROT" },
  { value: 5, label: "AUSSEN-SOUND (E-SOUND) MIT DEAKT." },
  { value: 6, label: "OHNE HV-BOOSTER" },
  { value: 7, label: "Nähte der Zuziehgriffe mit farblich abweichendem Faden" },
];

const farben = [
  { value: 0, label: "Seitenverkleidung Fond Leder n. Wahl (3.1a)" },
  { value: 1, label: "Sitzmittelbahn in Leder aus Angebot farblich abweichend" },
  { value: 2, label: "Vorder- u. Ruecksitze Leder n. Wahl" },
  { value: 3, label: "Verkleidung A-Saeulen/Windschutz-rahmen abweichende Lederzuordnung (1.0a)" },
  { value: 4, label: "SPORT CHRONO / KOMPASS BORDEAUXROT" },
  { value: 5, label: "AUSSEN-SOUND (E-SOUND) MIT DEAKT." },
  { value: 6, label: "OHNE HV-BOOSTER" },
  { value: 7, label: "Nähte der Zuziehgriffe mit farblich abweichendem Faden" },
];

const cnummern = [
  { value: "Deutschland", label: "C00-Deutschland" },
  { value: "USA", label: "C02-USA" },
  { value: "FRANKREICH", label: "C05-FRANKREICH" },
  { value: "JAPAN LL", label: "C08-JAPAN LL" },
  { value: "SCHWEDEN", label: "C09-SCHWEDEN" },
  { value: "SCHWEIZ", label: "C10-SCHWEIZ" },
  { value: "ÖSTERREICH", label: "C11-ÖSTERREICH" },
  { value: "DÄNEMARK", label: "C12-DÄNEMARK" },
];

const flattenChildrenRecursively = (
  data,
  parent = null,
  childHierachy = null
) => {
  let newData = [];

  if (data) {
    data.forEach((initialRow, parentIndex) => {
      let parentHierachy = [];
      initialRow.hierachy = parentHierachy;

      if (parent) {
        initialRow.parent = parent;
        parentHierachy = [...childHierachy];
        initialRow.hierachy = parentHierachy;
      }
      parentHierachy.push(parentIndex);

      newData.push(initialRow);

      if (initialRow.varianten) {
        newData = [
          ...newData,
          ...flattenChildrenRecursively(
            initialRow.varianten,
            initialRow,
            parentHierachy
          ),
        ];
      }
    });
  }

  return newData;
};

//export default varianten;

// without default
export {
  varianten,
  modelljahrTeilvariante,
  cnummern,
  flattenChildrenRecursively
}