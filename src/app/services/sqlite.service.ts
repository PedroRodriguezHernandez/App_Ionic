import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private db: SQLiteObject;
  private readonly tableName: string = 'documents';

  constructor(private sqlite: SQLite) {
    this.initializeDB();
  }

  // Inicializar la base de datos y crear la tabla si no existe
  private async initializeDB() {
    try {
      this.db = await this.sqlite.create({
        name: 'data.db',
        location: 'default'
      });
      await this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tableName} (name TEXT PRIMARY KEY, content TEXT)`, []);
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Guardar un documento en la base de datos
  public async saveDocument(name: string, content: JSON) {
    const contentString = JSON.stringify(content);
    const sql = `INSERT OR REPLACE INTO ${this.tableName} (name, content) VALUES (?, ?)`;
    try {
      await this.db.executeSql(sql, [name, contentString]);
      console.log('Documento guardado con éxito');
    } catch (error) {
      console.error('Error al guardar el documento:', error);
    }
  }

  // Recuperar un documento de la base de datos
  public async getDocument(name: string): Promise<JSON | null> {
    const sql = `SELECT content FROM ${this.tableName} WHERE name = ?`;
    try {
      const res = await this.db.executeSql(sql, [name]);
      if (res.rows.length > 0) {
        const contentString = res.rows.item(0).content;
        return JSON.parse(contentString);
      } else {
        console.log('Documento no encontrado');
        return null;
      }
    } catch (error) {
      console.error('Error al recuperar el documento:', error);
      return null;
    }
  }

  // Eliminar un documento de la base de datos
  public async deleteDocument(name: string) {
    const sql = `DELETE FROM ${this.tableName} WHERE name = ?`;
    try {
      await this.db.executeSql(sql, [name]);
      console.log('Documento eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    }
  }

  // Obtener todos los documentos de la base de datos
  public async getAllDocuments(): Promise<JSON[]> {
    const sql = `SELECT * FROM ${this.tableName}`;
    try {
      const res = await this.db.executeSql(sql, []);
      let documents: JSON[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        documents.push(JSON.parse(res.rows.item(i).content));
      }
      return documents;
    } catch (error) {
      console.error('Error al obtener todos los documentos:', error);
      return [];
    }
  }
}
