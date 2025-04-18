const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/VehiculoController');
const { verifyToken } = require('../utils');

/**
 * @swagger
 * /api/vehiculos:
 *   post:
 *     summary: Registrar entrada de vehículo
 *     tags: [Vehículos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - placa
 *               - tipoVehiculo
 *             properties:
 *               placa:
 *                 type: string
 *               tipoVehiculo:
 *                 type: string
 *                 enum: [carro, moto, bicicleta]
 *               clienteId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehículo registrado exitosamente
 *       400:
 *         description: Datos inválidos o vehículo ya registrado
 *       500:
 *         description: Error del servidor
 */
router.post('/', verifyToken, vehiculoController.registrarEntrada);

/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     summary: Obtener todos los vehículos estacionados
 *     tags: [Vehículos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos
 *       500:
 *         description: Error del servidor
 */
router.get('/', verifyToken, vehiculoController.listarVehiculosEstacionados);

/**
 * @swagger
 * /api/vehiculos/salida/{placa}:
 *   put:
 *     summary: Registrar salida de vehículo
 *     tags: [Vehículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placa
 *         schema:
 *           type: string
 *         required: true
 *         description: Placa del vehículo
 *     responses:
 *       200:
 *         description: Salida registrada exitosamente
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/salida/:placa', verifyToken, vehiculoController.registrarSalida);

/**
 * @swagger
 * /api/vehiculos/{placa}:
 *   get:
 *     summary: Buscar vehículo por placa
 *     tags: [Vehículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placa
 *         schema:
 *           type: string
 *         required: true
 *         description: Placa del vehículo
 *     responses:
 *       200:
 *         description: Datos del vehículo
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:placa', verifyToken, vehiculoController.buscarVehiculo);

module.exports = router;