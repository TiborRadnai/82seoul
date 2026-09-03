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

      // K-FOOD Mappa
      S.listItem()
        .title('K-Food & Gasztro')
        .child(
          S.list()
            .title('K-Food Tartalom')
            .items([
              S.documentTypeListItem('recipe').title('Receptek'),
              S.documentTypeListItem('kFoodProduct').title('Termékek & Italok'),
            ])
        ),

      // WEBSHOP Mappa (Kategóriákra bontva)
      S.listItem()
        .title('Webshop (K-Beauty)')
        .child(
          S.list()
            .title('Webshop Menü')
            .items([
              S.listItem()
                .title('Összes Termék')
                .child(S.documentTypeList('shopProduct').title('Összes Termék')),
              
              S.divider(),

              // Kategória szerinti szűrt listák a jobb átláthatóságért
              S.listItem()
                .title('Arckrémek & Hidratálók')
                .child(
                  S.documentList()
                    .title('Arckrémek')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Arckrém & Hidratáló"')
                ),
              S.listItem()
                .title('Szérumok & Esszenciák')
                .child(
                  S.documentList()
                    .title('Szérumok')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Szérum & Esszencia"')
                ),
              S.listItem()
                .title('Arctisztítók')
                .child(
                  S.documentList()
                    .title('Arctisztítók')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Arctisztító"')
                ),
              S.listItem()
                .title('Arcmaszkok & Peelingek')
                .child(
                  S.documentList()
                    .title('Arcmaszkok')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Arcmaszk & Peeling"')
                ),
              S.listItem()
                .title('Smink & Egyéb')
                .child(
                  S.documentList()
                    .title('Smink & Egyéb')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Smink & Egyéb"')
                ),
            ])
        ),

      // ÜGYFElek ÉS MARKETING Mappa (Teljesen új szárny)
      S.listItem()
        .title('Ügyfelek & Marketing')
        .child(
          S.list()
            .title('Marketing és Adatok')
            .items([
              S.documentTypeListItem('newsletterSubscriber').title('Hírlevél Feliratkozók'),
            ])
        ),
    ]);