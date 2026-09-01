import { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Tartalom')
    .items([
      // K-POP Mappa
      S.listItem()
        .title('K-Pop')
        .child(
          S.list()
            .title('K-Pop Tartalom')
            .items([
              S.documentTypeListItem('artist').title('Előadók / Bandák'),
            ])
        ),

      // K-DRAMA Mappa
      S.listItem()
        .title('K-Drama & Movies')
        .child(
          S.list()
            .title('K-Drama Tartalom')
            .items([
              S.documentTypeListItem('drama').title('Filmek / Sorozatok'),
              S.documentTypeListItem('actor').title('Színészek'),
            ])
        ),

      // K-FOOD Mappa (ÚJ)
      S.listItem()
        .title('K-Food & Gasztro')
        .child(
          S.list()
            .title('K-Food Tartalom')
            .items([
              S.documentTypeListItem('kfood').title('Receptek & Termékek'),
            ])
        ),
    ]);